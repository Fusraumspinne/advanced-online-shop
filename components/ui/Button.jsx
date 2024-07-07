import Button from 'react-bootstrap/Button';

function MagicButton({variant, content, funktion, extraClass}) {
  return (
    <>
      <Button className={extraClass} onClick={funktion} variant={variant}>{content}</Button>
    </>
  );
}

export default MagicButton;