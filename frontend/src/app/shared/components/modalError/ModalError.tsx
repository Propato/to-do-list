interface ModalErrorProps {
    messages: Array<string>
}

export const ModalError: React.FC<ModalErrorProps> = ({ messages }) => {

    return (
        <ul className="list-group my-2">
        { messages.map( (message) =>
            <li className="list-group-item list-group-item-danger" key={message}>
                <i className="bi bi-exclamation-circle mx-1"></i>
                <span className="mx-1">
                    { message }
                </span>
            </li>
        ) }
        </ul>
    );
};
