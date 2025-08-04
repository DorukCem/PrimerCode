import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import Question from "./components/Question";
import { useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import type { QuestionIds } from "./types/QuestionIds";
import About from "./components/About";
import API_CONFIG from "./config/api";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const fetchSolvedQuestions = async () => {
      fetch(`${API_CONFIG.BASE_URL}/user-questions`, {
        credentials: "include", // Important for sending auth cookies
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
          return response.json() as Promise<QuestionIds>;
        })
        .then((result) => {
          const localRaw = localStorage.getItem("solvedQuestions") || "{}";
          const localSolved = JSON.parse(localRaw) as Record<
            number,
            { solved: boolean; synced: boolean }
          >;

          result.ids.forEach(
            (id) => (localSolved[id] = { solved: true, synced: true })
          );
          const non_synced = Object.entries(localSolved)
            .filter((q) => q[1].solved && q[1].synced == false)
            .map((q) => Number(q[0]));

          if (non_synced.length > 0) {
            // Send it to the server to sync
            fetch(`${API_CONFIG.BASE_URL}/sync-questions`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ ids: non_synced }), // Send question ids
            })
              .then((syncResponse) => {
                if (!syncResponse.ok) {
                  throw new Error(`Sync failed: ${syncResponse.statusText}`);
                }
                return syncResponse.text();
              })
              .then((syncResult) => {
                if (syncResult === "success") {
                  // Mark the synced questions as synced in local storage
                  non_synced.forEach((id) => {
                    if (localSolved[id]) {
                      localSolved[id].synced = true;
                    }
                  });
                } else {
                  console.error("Sync failed:", syncResult);
                  // Still save the current state (with server data, but unsynced local items remain unsynced)
                }
              })
              .catch((syncError) => {
                console.error("Failed to sync solved questions:", syncError);
              })
              .finally(() =>
                localStorage.setItem(
                  "solvedQuestions",
                  JSON.stringify(localSolved)
                )
              );
          } else {
            // No sync needed, just update localStorage
            localStorage.setItem(
              "solvedQuestions",
              JSON.stringify(localSolved)
            );
          }
        })
        .catch((e) => {
          console.error("Failed to fetch solved questions:", e);
        });
    };

    if (!isLoading && isAuthenticated) {
      fetchSolvedQuestions();
    }
  }, [isAuthenticated, isLoading]);

  return (
    <Router>
      <div className="flex flex-col h-screen bg-neutral-900">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/questions/:slug" element={<Question />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
