import React, { useState, useEffect } from "react";

interface Attack {
  name: string;
  damage: string;
  cost: string[];
}

interface Card {
  images: {
    large: string;
  };
  name: string;
  hp: string;
  types?: string[];
  attacks?: Attack[];
}

interface ModalProps {
  card: Card | null;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ card, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (card) {
      setIsVisible(true);
    }
  }, [card]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (!card) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className={`modal-content ${isVisible ? "modal-slide-in" : "modal-slide-out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose}>×</button>
        <div className="modal-body">
          <div className="modal-card">
            <div className="card-inner">
              <div className="card-front">
                <img src={card.images.large} alt={card.name} />
              </div>
              <div className="card-back">
                <img src="./assets/pokemon_back_card.png" alt="Verso de la carte" />
              </div>
            </div>
          </div>

          <div className="modal-details">
            <h2>{card.name}</h2>
            <p><strong>Points de vie :</strong> {card.hp || "N/A"}</p>
            <p><strong>Type :</strong> {card.types?.join(", ") || "N/A"}</p>
            <p><strong>Attaques :</strong></p>
            {card.attacks ? (
              <ul>
                {card.attacks.map((attack, index) => (
                  <li key={index}>
                    <strong>{attack.name}</strong>: {attack.damage || "N/A"} dégâts ({attack.cost?.join(", ") || "N/A"})
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune attaque disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;