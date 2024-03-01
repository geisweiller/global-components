interface CardProps {
  /**
   *(optional)  The adress for the image of the product. 
   */
  image?: string
  /**
   * The title of the product. the title will also be use to generate the "alt" of the image as `image of ${title}`.
   */
  title: string;
  /**
   *(optional) The description of the product. 
   */
  description?: string;
}

// This is a Card to display products. You can rearange the html tags to have it on different formats.


export const card = ({ image, title, description }: CardProps) => {
  const imageTitle = `image of ${title}`
  return(
    
  <div>
    <img src={image} alt={imageTitle} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
)
};

