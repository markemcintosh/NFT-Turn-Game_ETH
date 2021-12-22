const CONTRACT_ADDRESS = '0x4107bB71DaEe0A285C2224B18049A3902f7A9A0A';

/*
 * Add this method and make sure to export it on the bottom!
 */
const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
    
    
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };

