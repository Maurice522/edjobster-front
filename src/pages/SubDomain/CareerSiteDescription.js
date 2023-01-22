import React from 'react'

function CareerSiteDescription() {
    return (
        <div>
            <h1 className='InstituteTitle'>SRM Institute Of Technology (Institute-Title)</h1>
            <hr style={{ width: '70%', color: 'grey', margin: '5% auto', justifyContent: "center" }} />
            <div className='InstitutePhotoAddress'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRvPseQ_eXBy0JHhwi0Os_KRiq9mASdmH6EGWF_
                    e34FegX6NUDtfWh_f-jUq7Cjt5gHVE&usqp=CAU" alt="InstitutePhoto"
                />
                <div className='InstituteAddress'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. (landmark, city, state, country)
                </div>
            </div>
            
            <div className='InstituteDescription'>
                <p>(Description)</p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only
                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
            </div>
        </div>
    )
}

export default CareerSiteDescription