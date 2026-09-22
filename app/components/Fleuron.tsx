const description =
  'The fleuron, a leaf-shaped ornament used by printers since the Renaissance, is a small nod to the care owed to words and their readers.';

export default function Fleuron() {
  return (
    <div className="fleuron" role="img" aria-label={description} title={description}>
      <span aria-hidden="true">&#10086;</span>
    </div>
  );
}
