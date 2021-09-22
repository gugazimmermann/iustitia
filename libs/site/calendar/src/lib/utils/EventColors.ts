enum EVENT_COLORS {
   Cinza = "Cinza",
   CinzaClaro = "Cinza Claro",
   Vermelho = "Vermelho",
   VermelhoClaro = "Vermelho Claro",
   Amarelo = "Amarelo",
   AmareloClaro = "Amarelo Claro",
   Verde = "Verde",
   VerdeClaro = "Verde Claro",
   Azul = "Azul",
   AzulClaro = "Azul Claro",
   Indigo = "Indigo",
   IndigoClaro = "Indigo Claro",
   Roxo = "Roxo",
   RoxoClaro = "Roxo Claro",
   Rosa = "Rosa",
   RosaClaro = "Rosa Claro"
}

export default EVENT_COLORS

// TODO: add to tailwind prod
export function CalendarEventBackGround(color: EVENT_COLORS) {
   switch (color) {
      case EVENT_COLORS.Cinza: {
         return `bg-gray-400`
      }
      case EVENT_COLORS.CinzaClaro: {
         return `bg-gray-300`
      }
      case EVENT_COLORS.Vermelho: {
         return `bg-red-500`
      }
      case EVENT_COLORS.VermelhoClaro: {
         return `bg-red-300`
      }
      case EVENT_COLORS.Amarelo: {
         return `bg-yellow-200`
      }
      case EVENT_COLORS.AmareloClaro: {
         return `bg-yellow-400`
      }
      case EVENT_COLORS.Verde: {
         return `bg-green-200`
      }
      case EVENT_COLORS.VerdeClaro: {
         return `bg-green-500`
      }
      case EVENT_COLORS.Azul: {
         return `bg-blue-200`
      }
      case EVENT_COLORS.AzulClaro: {
         return `bg-blue-400`
      }
      case EVENT_COLORS.Indigo: {
         return `bg-indigo-200`
      }
      case EVENT_COLORS.IndigoClaro: {
         return `bg-indigo-400`
      }
      case EVENT_COLORS.Roxo: {
         return `bg-purple-300`
      }
      case EVENT_COLORS.RoxoClaro: {
         return `bg-purple-500`
      }
      case EVENT_COLORS.Rosa: {
         return `bg-pink-300`
      }
      case EVENT_COLORS.RosaClaro: {
         return `bg-pink-500`
      }
      default: {
         return `bg-primary-500`
      }
   }
}


