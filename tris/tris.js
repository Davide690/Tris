// Inizializza il tabellone come un array vuoto per le celle
let board = ["", "", "", "", "", "", "", "", ""];

// Giocatore attuale, inizia con X
let currentPlayer = "X";

// Flag per controllare se il gioco è finito
let isGameOver = false;

// Contatori delle vittorie per i giocatori X e O
let xWins = 0; // Vittorie di X
let oWins = 0; // Vittorie di O

// Seleziona le celle della griglia, lo stato del gioco e i punteggi
const cells = document.querySelectorAll('.cell'); // Seleziona tutte le celle
const statusDisplay = document.getElementById('status'); // Sezione stato del gioco
const xWinsDisplay = document.getElementById('xWins'); // Sezione punteggio di X
const oWinsDisplay = document.getElementById('oWins'); // Sezione punteggio di O
const restartButton = document.getElementById('restartBtn'); // Pulsante di restart

// Funzione per aggiornare il messaggio di stato
function updateStatus(message) {
    statusDisplay.textContent = message; // Aggiorna il testo dello stato del gioco
}

// Funzione per controllare se c'è un vincitore
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Righe
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonne
        [0, 4, 8], [2, 4, 6]             // Diagonali
    ];

    // Controlla ciascuna combinazione vincente
    for (let combination of winningCombinations) {
        const [a, b, c] = combination; // Estrae gli indici
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true; // Imposta il flag di fine gioco
            return board[a]; // Restituisce il simbolo del vincitore
        }
    }

    // Controlla se ci sono celle vuote; se non ce ne sono, è un pareggio
    if (!board.includes("")) {
        return "Tie"; // Restituisce "Tie" per il pareggio
    }
    
    return null; // Restituisce null se non ci sono vincitori
}

// Funzione che gestisce il click sulle celle
function handleCellClick(event) {
    const cell = event.target; // Riferimento alla cella cliccata
    const index = cell.getAttribute('data-index'); // Ottiene l'indice della cella

    // Controlla se la cella è già occupata o se il gioco è finito
    if (board[index] !== "" || isGameOver) {
        return; // Non fare nulla
    }

    // Aggiorna il tabellone con il simbolo del giocatore attuale
    board[index] = currentPlayer;
    cell.textContent = currentPlayer; // Mostra il simbolo nella cella

    // Controlla se c'è un vincitore
    const winner = checkWinner();

    if (winner) {
         // Se c'è un vincitore o un pareggio, aggiorna lo stato del gioco
         if (winner === "Tie") {
            updateStatus("È un pareggio!"); // Messaggio di pareggio
        } else {
            updateStatus(`Giocatore ${winner} ha vinto!`); // Messaggio di vittoria
            // Incrementa il conteggio delle vittorie del giocatore vincente
            if (winner === "X") {
                xWins++; // Incrementa vittorie di X
                xWinsDisplay.textContent = xWins; // Aggiorna il punteggio di X
            } else {
                oWins++; // Incrementa vittorie di O
                oWinsDisplay.textContent = oWins; // Aggiorna il punteggio di O
            }
        }
    } else {
        // Se non c'è un vincitore, cambia il turno
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna il giocatore
        updateStatus(`Turno del giocatore ${currentPlayer}`); // Aggiorna lo stato per il prossimo turno
    }
}

// Funzione per resettare il gioco
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""]; // Resetta il tabellone
    isGameOver = false; // Imposta il flag di fine gioco a false
    currentPlayer = "X"; // Riavvia il turno con X
    cells.forEach(cell => cell.textContent = ""); // Pulisce tutte le celle
    updateStatus("Turno del giocatore X"); // Mostra il turno iniziale
}

// Aggiunge gli eventi di click alle celle della griglia
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Aggiunge l'evento al pulsante di restart per ripristinare il gioco
restartButton.addEventListener('click', resetGame);

// Mostra lo stato iniziale del gioco
updateStatus("Turno del giocatore X"); // Mostra chi inizia
