// src/Router.jsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './CivicTranslator/Home.jsx';
import CitizenReport from './CitizenReport/CitizenReport.jsx';
import BadgeDispatch from './BadgeDispatch/BadgeDispatch.jsx';
import PoeticLogs from './PoeticLogs/PoeticLogs.jsx';

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CitizenReport" element={<CitizenReport />} />
        <Route path="/BadgeDispatch" element={<BadgeDispatch />} />
        <Route path="/PoeticLogs" element={<PoeticLogs />} />
      </Routes>
    </HashRouter>
  );
}
