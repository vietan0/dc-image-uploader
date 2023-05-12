import StyledUploading from './styled';

export default function Loading() {
  return (
    <StyledUploading>
      <p>Uploading…</p>
      <div className="loading-bar">
        <div className="running-bar" />
      </div>
    </StyledUploading>
  );
}
