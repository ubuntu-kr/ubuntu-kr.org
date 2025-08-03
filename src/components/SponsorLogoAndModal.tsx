
import { useState, type MouseEvent } from "react";
import Markdown from "marked-react";
type SponsorLogoAndModalProps = {
    name: string,
    level: string,
    logoImageSrc: string,
    description: string,
    url: string,
    showPopup: Boolean,
    index: number
}
export default function SponsorLogoAndModal(props: SponsorLogoAndModalProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const closeHandler = (e: KeyboardEvent | MouseEvent<HTMLButtonElement>) => {
        if (e.type === "click" || (e as KeyboardEvent).key === "Escape") {
            setModalOpen(false);
            document.removeEventListener("keydown", closeKeyListener);
        }
    };
    const closeKeyListener = (e: KeyboardEvent) => closeHandler(e);

    return (
        <>
            <button className="p-button--base" onClick={() => {
                if (props.showPopup) {
                    setModalOpen(true);
                    document.addEventListener("keydown", closeKeyListener);
                }
            }} aria-controls={`modal-${props.level}-${props.index}`} style={{ width: "100%"}}>
                <img
                    src={props.logoImageSrc} alt={props.name} loading="lazy" decoding="async"
                    style={{ maxHeight: "5rem" }} />
            </button>

            <div className="p-modal" id={`modal-${props.level}-${props.index}`} style={{ display: modalOpen && props.showPopup ? "flex" : "none" }}>
                <section className="p-modal__dialog" role="dialog" aria-modal={modalOpen && props.showPopup ? "true" : "false"} aria-labelledby="modal-title" aria-describedby="modal-description">
                    <header className="p-modal__header">
                        <h2 className="p-modal__title" id={`modal-${props.level}-${props.level}-title`}>{props.name}</h2>
                        <button className="p-modal__close" aria-label="Close active modal" aria-controls="modal" onClick={closeHandler}>Close</button>
                    </header>
                    <img src={props.logoImageSrc} alt={props.name} loading="lazy" decoding="async" style={props.level !== "Community" ? { width: "100%" } : { maxHeight: "10rem" }} />
                    <b>{props.level}</b>
                    <Markdown>
                        {props.description}
                    </Markdown>
                    <footer className="p-modal__footer">
                        <a href={props.url} target="_blank"><button className="p-button--positive u-no-margin--bottom">{"Website"}</button></a>
                    </footer>
                </section>
            </div>
        </>
    )
}