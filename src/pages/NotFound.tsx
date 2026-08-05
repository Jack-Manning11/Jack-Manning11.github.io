import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <>
      <h1 className="detail__title" style={{ marginTop: 0 }}>
        Page not found
      </h1>
      <p className="muted">
        That page doesn’t exist.{' '}
        <Link to="/" className="back-link">
          Back home
        </Link>
      </p>
    </>
  );
}
