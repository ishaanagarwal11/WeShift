import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore();

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8000/pipelines/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nodes, edges })
            });
            if (!response.ok) throw new Error("Submission failed");
            const result = await response.json();
            alert(`Submission Successful!
Nodes: ${result.num_nodes}
Edges: ${result.num_edges}
Is DAG: ${result.is_dag ? "Yes" : "No"}`);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return <button onClick={handleSubmit}>Submit</button>;
};