const todoList = [
  { id: 1, title: "Complete assignment"},
  { id: 2, title: "Cook dinner"},
  { id: 3, title: "Clean the kitchen"},
  { id: 4, title: "Go to the gym"},
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;