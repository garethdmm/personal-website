const description =
  'The fleuron is a leaf-shaped ornament used by printers since the Renaissance. It means something like: "Made with care for the reader".';

export default function Fleuron() {
  return (
    <div className="fleuron" role="img" aria-label={description} title={description}>
      <span aria-hidden="true">&#10086;</span>
    </div>
  );
}
