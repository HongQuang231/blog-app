interface IContact {
  image: string,
  name: string,
  position: string,
  email: string,
  isAboutUs?: boolean,
}

const ContactUsItem = (props: IContact) => {
  return (
    <div style={{
      width: 200,
      height: props.isAboutUs ? 250 : 300,
      borderRadius: 8,
      boxShadow: '0px 0px 10px #988383',
      position: "relative"
    }} className="hover:animate-jump">
      <div className="flex items-center justify-center">
        <img
          style={{
            width: props.isAboutUs ? 180 : 200,
            height: props.isAboutUs ? 240 : 200,
            boxShadow: '0px 0px 10px #988383',
            right: props.isAboutUs ? 20 : 0
          }} className={
            props.isAboutUs ? 'absolute rounded-sm' : 'rounded-full absolute'
          } src={props.image} />
      </div>
      <div style={{
        marginTop: props.isAboutUs ? 160 : 120
      }} className="p-3 animate-fade-up">
        {!props.isAboutUs && (
          <div className="text-xl text-center font-semibold">{props.name} </div>
        )}
        <div className="text-xs text-center p-2 font-light">{props.position}</div>
        {!props.isAboutUs && (
          <div className="text-xs text-center font-light">{props.email}</div>
        )}

      </div>
    </div>
  )
}

export default ContactUsItem;