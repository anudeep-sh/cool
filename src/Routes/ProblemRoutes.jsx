import React from "react";
import { Routes, Route } from "react-router-dom";
import { LazyComponent } from "../components/LazyLoader";

const ContestProblem = LazyComponent(() =>
  import("../pages/Contest/ContestProblem")
);
const ProblemExplanation = LazyComponent(() =>
  import("../components/CodingContests/ContestProblem/Explanation")
);
const ProblemSubmit = LazyComponent(() =>
  import("../components/CodingContests/ContestProblem/UploadCodeLink")
);
const MySubmissions = LazyComponent(() =>
  import("../components/CodingContests/ContestProblem/ProblemMySubmissions")
);
const ProblemDiscussion = LazyComponent(() =>
  import("../components/CodingContests/ContestProblem/Discussion")
);

export const ProblemRoutes = () => {
  return (
    <Routes>
      <Route path="/:problemId" element={<ContestProblem />} />
      {/* <Route path="/:problemId/explanation" element={<ProblemExplanation />} /> */}
      {/* <Route path="/:problemId/submit" element={<ProblemSubmit />} /> */}
      {/* <Route path="/:problemId/submissions" element={<MySubmissions />} /> */}
      <Route path="/:problemId/discussion" element={<ProblemDiscussion />} />
    </Routes>
  );
};
