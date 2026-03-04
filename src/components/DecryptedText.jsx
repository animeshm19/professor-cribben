import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const SYMBOLS = "ΣπΔΩμσ01∞∫≈∇×÷±"; // Math and statistics symbols

export default function DecryptedText({ text, className, speed = 40 }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    let interval = null;

    interval = setInterval(() => {
      setDisplayText((current) => {
        // Map over the target text
        const mappedText = text
          .split("")
          .map((letter, index) => {
            // If the iteration has passed this letter's index, show the real letter
            if (index < iteration) {
              return text[index];
            }
            // Otherwise, show a random math symbol (keep spaces as spaces)
            if (letter === " ") return " ";
            return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          })
          .join("");

        return mappedText;
      });

      // Increase the iteration counter slightly (decimals create a smoother "scanning" effect)
      iteration += 1 / 3;

      // Stop the interval when the entire string is revealed
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Ensure final state is exactly the target text
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText || text.replace(/[^ ]/g, "0")} 
    </span>
  );
}