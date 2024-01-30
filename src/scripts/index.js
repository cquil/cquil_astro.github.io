
// 要素を取得する
const poke_container = document.getElementById('poke-container')

// 定数を定義
// 表示するポケモン数
const pokemon_count = 1010

// カラー
const colors = {
  fire: '#f45c19',
  grass: '#28b25c',
	electric: '#eaa317',
	water: '#4a96d6',
	ground: '#916d3c',
	rock: '#878052',
	fairy: '#f45c19',
	poison: '#884898',
	bug: '#989001',
	dragon: '#454ba6',
	psychic: '#d56d8b',
	flying: '#7e9ecf',
	fighting: '#9a3d3e',
	normal: '#aea886',
  ice:'#45a9c0',
  dark: '#7a0049',
  ghost: '#555fa4',
  steel: '#9b9b9b' 
}

// colorsのkeyを配列に格納
const main_types = Object.keys(colors)

// ポケモン取得
const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()

    // 日本語の名前を取得するための新しいURL
    const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    const speciesRes = await fetch(speciesUrl)
    const speciesData = await speciesRes.json()

    // 日本語の名前を取得
    const jpName = speciesData.names.filter(name => name.language.name === 'ja')[0].name

    // createPokemonCard関数に日本語の名前も渡します
    createPokemonCard(data, jpName)


}

// ポケモンカードを作成
const createPokemonCard = (pokemon, jpName) => {
    // div要素を作成
    const pokemonEl = document.createElement('div')
    // pokemonクラスを追加
    pokemonEl.classList.add('pokemon')

    // ポケモン情報からデータを格納
    const name = jpName
    const id = pokemon.id.toString().padStart(3, '0')
    const poke_types = pokemon.types.map(type => type.type.name)
    const translatedTypes = poke_types.map(type => typeTranslations[type]);
    const typeSpans = translatedTypes.map(t => `<small>${t}</small>`).join(' ');
    const primaryType = poke_types[0];
    const color = colors[primaryType];

    // ポケモンの背景色を設定
    pokemonEl.style.backgroundColor = color

    // ポケモンカードのテンプレ
    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <div class="type">
          <small>タイプ :</small> 
          <div class="type_detail">
            ${typeSpans} 
          </div>
          </div>
    </div>
    `

    // ポケモンカードのテンプレートを追加
    pokemonEl.innerHTML = pokemonInnerHTML

    // poke_containerの子要素として追加
    poke_container.appendChild(pokemonEl)
}

// ページが読み込まれた時に実行
fetchPokemons()


// タイプの英語名と日本語名のマップ
const typeTranslations = {
  fire: 'ほのお',
  grass: 'くさ',
  electric: 'でんき',
  water: 'みず',
  ground: 'じめん',
  rock: 'いわ',
  fairy: 'フェアリー',
  poison: 'どく',
  bug: 'むし',
  dragon: 'ドラゴン',
  psychic: 'エスパー',
  flying: 'ひこう',
  fighting: 'かくとう',
  normal: 'ノーマル',
  ice: 'こおり',
  dark: 'あく',
  ghost: 'ゴースト',
  steel: 'はがね' 
}