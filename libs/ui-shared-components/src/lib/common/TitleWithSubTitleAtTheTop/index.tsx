type TitleWithSubTitleAtTheTopProps = {
  title: string
  subtitle: string
  classTitle?:string
  classSubtitle?:string
  hideColon?: boolean
}

function TitleWithSubTitleAtTheTop({
  title,
  subtitle,
  classTitle = 'text-lg',
  classSubtitle,
  hideColon = false
}: TitleWithSubTitleAtTheTopProps) {
  return (
    <div>
      <p className={`-mb-2 text-gray-500 text-tiny ${classSubtitle}`}>{subtitle}{!hideColon && ':'}</p>
      <h1 className={`mb-1 dark:text-white ${classTitle}`}>{title}</h1>
    </div>
  )
}

export default TitleWithSubTitleAtTheTop
