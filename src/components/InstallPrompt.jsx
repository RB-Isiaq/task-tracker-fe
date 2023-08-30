import { useEffect, useState } from "react";
import Arrow from "../assets/icons/arrow.svg";

export const InstallPrompt = () => {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setInstallPromptEvent(null);
      });
    }
  };

  return (
    <div className="absolute bottom-0 right-0 mb-20 mr-6 cursor-pointer">
      {installPromptEvent && (
        <img src={Arrow} alt="install arrow" onClick={handleInstallClick} />
      )}
    </div>
  );
};
