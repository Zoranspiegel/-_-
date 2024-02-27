export default function NotFoundPage (): JSX.Element {
  return (
    <div className='h-full flex flex-col justify-center items-center rounded-lg border-4 border-double border-[red] shadow-[red] shadow-lg p-4 mb-4'>
      <p
        className='text-[red] text-opacity-50 text-center text-xl select-text'
        style={{ textShadow: '5px 5px 2px rgb(150,0,0), -5px -5px 2px rgb(150,0,0)' }}
      >
        Природа је храм где мутне речи слећу
        са стубова живих понекад, а доле
        ко кроз шуму иде човек кроз симболе
        ма што га путем присиним погледима срећу.
        Ко одјеци дуги што даљем се своде
        у јединство мрачно и дубоко што је
        огромно ко ноћ и као светлост, боје
        мириси и звуци разговоре воде.
        Неки су мириси ко пут дечија свежи
        зелени ко поље, благи ко обоје...
        Али други смрде на крв која се накупља
        на улицама којима су путовали ловци.
      </p>
    </div>
  );
}
