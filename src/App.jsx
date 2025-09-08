import React, { useState, createContext, useContext } from "react";

// ==================== CONTEXTO DE CONTATOS ====================
const ContactsContext = createContext();

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    setContacts(prev => [...prev, contact]);
  };

  return (
    <ContactsContext.Provider value={{ contacts, addContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactsContext);
}

// ==================== FORMULÁRIO ====================
function FormScreen() {
  const { addContact } = useContacts();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Preencha todos os campos!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Digite um e-mail válido!");
      return;
    }

    addContact({ name, email });
    setName("");
    setEmail("");
    setError("");
    alert("Contato adicionado com sucesso!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>📋 Formulário de Contato</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#4CAF50", color: "white", border: "none" }}>Adicionar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

// ==================== LISTA DE CARDS ====================
function CardsScreen() {
  const { contacts } = useContacts();

  if (contacts.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Nenhum contato cadastrado ainda.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", padding: "20px" }}>
      {contacts.map((c, index) => (
        <div key={index} style={{ width: "200px", border: "1px solid #ccc", borderRadius: "10px", padding: "15px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ margin: "0 0 10px 0" }}>{c.name}</h3>
          <p style={{ margin: 0, color: "#555" }}>{c.email}</p>
        </div>
      ))}
    </div>
  );
}

// ==================== APP PRINCIPAL ====================
export default function App() {
  const [page, setPage] = useState("form");

  return (
    <ContactsProvider>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => setPage("form")} style={{ marginRight: "10px", padding: "6px 12px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Formulário</button>
        <button onClick={() => setPage("cards")} style={{ padding: "6px 12px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Lista de Contatos</button>
      </div>
      {page === "form" ? <FormScreen /> : <CardsScreen />}
    </ContactsProvider>
  );
}
