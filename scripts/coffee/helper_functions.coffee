capitalizeWord = (word)->
  if (word.length == 0)
    return word
  else if (word.length == 1)
    return word.toUpperCase()
  else
    return word[0].toUpperCase() + word.substring(1)
window.capitalizeWord = capitalizeWord

capitalizeSentence = (sentence)->
  word_arr = sentence.split(/[\s_]+/)
  
  if word_arr.length == 0
    return sentence

  $.each(word_arr, (i, word)->
    word_arr[i] = capitalizeWord(word)
    )
  return word_arr.join(' ')
window.capitalizeSentence = capitalizeSentence
