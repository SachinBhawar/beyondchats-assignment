import Articles from "./components/Articles";

function App() {
    return (
        <div className="min-h-screen">
            <header className="bg-white shadow">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold">BeyondChats</h1>
                </div>
            </header>
            <main>
                <Articles />
            </main>
        </div>
    );
}

export default App;
