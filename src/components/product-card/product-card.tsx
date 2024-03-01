import {Counter} from '../counter/counter'

interface ProductCardProps {
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
// This component will use tailwind css for styles to give a basic default of styles for it.
// This component uses other components from this repository (counter) for it to work you will have to have a counter (ours or an of your own) on your project. If you don't need a counter on your card you can just remove it from the html tags and imports.
export const ProductCard = ({ image, title, description }: ProductCardProps) => {
  const imageTitle = `image of ${title}`
  return(
    
  <div>
    <img src={image} alt={imageTitle} />
    <h3>{title}</h3>
    <p>{description}</p>
    <Counter />
  </div>
)
};

