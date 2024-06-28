import { Routes,Route } from "react-router-dom";
import Table from "./components/react-table/Table";
import Create from "./components/Actions/Create";
import Edit from "./components/Actions/Edit";
import Form from "./components/react-hook-form/Form";





function App() {
  return (
    <div>

     <Routes>
      <Route path="/" element={<Table/>}/>
      <Route path="create" element={<Create/>}/>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/form" element={<Form/>}/>
     </Routes>
    </div>
  );
}

export default App;
