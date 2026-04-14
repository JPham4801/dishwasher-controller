function ErrorAlert({ error }) {
	return <div>{error && <p>{error}</p>}</div>;
}

export default ErrorAlert;