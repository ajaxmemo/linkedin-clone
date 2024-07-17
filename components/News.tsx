import { Info } from 'lucide-react'
import React from 'react'

const News = () => {
  interface NAVITEMS {
    heading: string,
    subHeading: string
  }
  const newsItems: NAVITEMS[] = [
    {
      heading: "E-retailer retag health drinks",
      subHeading: "4h ago - 345 readers"
    },
    {
      heading: "Lets transport raises $22 million",
      subHeading: "4h ago - 323 readers"
    },
    {
      heading: "Casual waer is in at India Inc",
      subHeading: "4h ago - 234 readers"
    },
    {
      heading: "Snaller cities go on loans",
      subHeading: "4h ago - 112 readers"
    },
  ]
  return (
    <div className='bg-white py-2 rounded-sm h-fit w-[20%]'>
      <div className='flex justify-between px-3'>
        <h2>Linkedin News</h2>
        <Info  className='w-4 cursor-pointer'/>
      </div>
      <div>
        <h2 className='text-sm text-gray-500 py-2 px-3'>Top stories</h2>
        {
          newsItems.map((news,index)=>{
            return(
              <div key={index} className='py-1 cursor-pointer hover:bg-gray-100 px-3' >
              <h2 className='text-sm text-black font-medium'>{news.heading}</h2>
              <h3 className='text-xs'>{news.subHeading}</h3>
            </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default News
