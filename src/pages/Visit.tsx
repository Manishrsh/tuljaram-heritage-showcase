import { Navigate } from "react-router-dom";

// Visit and Contact are merged — redirect Visit to the unified Contact page.
const VisitPage = () => <Navigate to="/contact" replace />;

export default VisitPage;
