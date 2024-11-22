import { useState } from 'react'
import Modal from './Modal'
import axios from 'axios'

interface Card {
  id: string
  name: string
  images: {
    small: string
    large: string
  }
}

interface CardProps {
  card: Card
  openModal: (card: Card) => void
}

function App() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [cards, setCards] = useState<Card[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const openModal = (card: Card) => {
    setSelectedCard(card)
  }

  const closeModal = () => {
    setSelectedCard(null)
  }

  const fetchCards = async () => {
    setError('')
    setIsLoading(true)
    setCards([])
    try {
      const response = await axios.get<{ data: Card[] }>(
        `https://api.pokemontcg.io/v2/cards?q=name:${query}`,
        { headers: { 'X-Api-Key': '162fed96-0003-41b1-a76c-bcca89a61550' } },
      )
      setCards(response.data.data)
    } catch (err) {
      console.error(err)
      setError("Une erreur s'est produite. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Trouve ta carte</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nom du Pokémon"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            flex: 1,
          }}
        />
        <button
          onClick={fetchCards}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Chercher
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <div className="spinner"></div>
        </div>
      )}
      <div className="card-container">
        {cards.map((card: Card) => (
          <Card key={card.id} card={card} openModal={openModal} />
        ))}
      </div>
      <Modal card={selectedCard} onClose={closeModal} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Précédent
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Suivant</button>
      </div>
    </div>
  )
}

function Card({ card, openModal }: CardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)

  return (
    <div className="card" onClick={() => openModal(card)}>
      <div className="card-inner">
        <div className="card-front">
          {isImageLoading && <div className="spinner"></div>}
          <img
            src={card.images.large}
            alt={card.name}
            style={{ display: isImageLoading ? 'none' : 'block' }}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  )
}

export default App
