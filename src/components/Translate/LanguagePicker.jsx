import React, { useState } from 'react'
import { countryLangs } from "./Languages";
import { BsArrowLeft } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';

const LanguagePicker = ({setLangPair, langpair, isOpen, lang}) => {
  let check = lang === 'lastLang' ? 'lastLang' : 'firstLang'
  console.log(langpair[check] );
  const [value, setValue] = useState('')
  const countryFilter = countryLangs.filter((filtred) => filtred.language.toLowerCase().includes(value.toLowerCase()))
  const setActiveLanguage = (language) => {
    if(lang === 'firstLang'){
        if(langpair.firstLang.toLocaleLowerCase() == language.code.toLocaleLowerCase()){
          return 'lnPickerBx active'
        }
    }else if(lang === 'lastLang'){
      if(langpair.lastLang.toLocaleLowerCase() == language.code.toLocaleLowerCase()){
        return 'lnPickerBx active'
      }
    }else{
      return 'lnPickerBx'
    }
  }
  
  return (
    <div className='languagePicker'>
      <div className="languagepickerInput">
        <div className="picker_icon" onClick={() => isOpen(false)}><BsArrowLeft /></div>
        <input type="text" placeholder='Search languages' onChange={(e) => setValue(e.target.value)} value={value} />
      </div>
      <motion.div className="languagePickerContainer" layout animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} > 
        <AnimatePresence mode='wait'>
     {countryFilter.map((item, index) => (
          <motion.div  layout key={index} className={langpair[check] == item.code ? 'lnPickerBx active' : 'lnPickerBx'} onClick={() => {
            setLangPair({...langpair, [lang]: item.code.toLocaleLowerCase()})
            isOpen(false)
          }}>
            {item.language}
          </motion.div>
    ))}
    </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default LanguagePicker