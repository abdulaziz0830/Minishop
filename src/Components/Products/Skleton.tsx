import ContentLoader from "react-content-loader"

const Skleton = () => {
  return (
    <ContentLoader
    speed={2}
    width={403}
    height={345}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="18" ry="18" width="403" height="220" />
      <rect x="15" y="250" rx="5" ry="5" width="250" height="20" />
      <rect x="15" y="285" rx="5" ry="5" width="310" height="65" />
    </ContentLoader>
  )
}

export default Skleton