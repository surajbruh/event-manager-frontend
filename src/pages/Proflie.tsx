import { useAuth } from "../service/auth/useAuth";

export default function Profile() {
  const { state: authState } = useAuth();

  return (
    <>
      <h1> Profile page!</h1>
      {authState.user ? (
        <div>
          {/* The arguments (null, 2) add 2 spaces of indentation */}
          <pre style={{ background: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(authState.user, null, 2)}
          </pre>
        </div>
      ) : (
        <p>not authenticated</p>
      )}
    </>
  );
}
