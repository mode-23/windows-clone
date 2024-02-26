import React, { useEffect, useState } from 'react'
import './whatsapp.css'
import './responsiveWhatsapp.css'
import CreateNumber from './CreateNumber';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import WhatsappDashboard from './WhatsappDashboard';
import WhatsappLoading from './WhatsappLoading';
import { useNavigate } from 'react-router-dom';
const Whatsapp = ({user}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [wideTab, isWideTab] = useState(true)
  const [tabbed, isTabbed] = useState(false)
  useEffect(() => {
    if(user?.uid){
        setLoading(true)
        const unsub = onSnapshot(doc(db, "user", user?.uid), (doc) => {
             setData(doc.data())
             setLoading(false)
        });
        return () => {
          unsub();
        }
    }
    }, [user])
    const handleTabSize = () => {
      if(wideTab){
        return 'tab whatsapp wide'
      }else if(tabbed){
        return 'tab whatsapp close'
      }else{
        return 'tab whatsapp'
      }
    }
  return (
    <div className={handleTabSize()}>
            {loading ? 
            <WhatsappLoading />
              :
            <>
            {data?.phoneNumber && data?.phoneNumber !== '' ?
            <WhatsappDashboard isWideTab={isWideTab} wideTab={wideTab} isTabbed={isTabbed} tabbed={tabbed} />
            :
            <CreateNumber user={user} />
            }
        </>
            }

    </div>
  )
}

export default Whatsapp