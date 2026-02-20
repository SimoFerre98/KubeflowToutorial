import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ChapterComponents } from './pages/chapters/ChapterComponents';
import { ChapterPipeline } from './pages/chapters/ChapterPipeline';
import { ChapterHelloWorld } from './pages/chapters/ChapterHelloWorld';
import { ChapterArtifacts } from './pages/chapters/ChapterArtifacts';
import { ChapterUnderTheHood } from './pages/chapters/ChapterUnderTheHood';
import { ChapterCompleteExample } from './pages/chapters/ChapterCompleteExample';
import { ProgressDashboard } from './pages/ProgressDashboard';
import { Cheatsheet } from './components/Cheatsheet';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/tutorial/components" replace />} />
          <Route path="/tutorial/components" element={<ChapterComponents />} />
          <Route path="/tutorial/pipeline" element={<ChapterPipeline />} />
          <Route path="/tutorial/helloworld" element={<ChapterHelloWorld />} />
          <Route path="/tutorial/artifacts" element={<ChapterArtifacts />} />
          <Route path="/tutorial/underthehood" element={<ChapterUnderTheHood />} />
          <Route path="/tutorial/complete-example" element={<ChapterCompleteExample />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="*" element={<Navigate to="/tutorial/components" replace />} />
        </Routes>
        <Cheatsheet />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
