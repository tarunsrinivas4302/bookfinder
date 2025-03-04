import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
const BookCard = ({ data }) => {
    return (
        <Card className="shadow-lg rounded-2xl overflow-hidden border mb-2">
            <CardHeader className="relative">
                <div className="relative">
                    <LazyLoadImage
                        src={data.image}
                        alt={data.subtitle}
                        effect="black-and-white"
                        className="w-60 h-60 object-cover transition-transform duration-300 "
                    />
                </div>
                <CardTitle className="text-center font-semibold mt-4 px-2 mb-0 truncate text-xl">
                    {data.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="px-4">
                <p className="h-14 text-gray-700 dark:text-white text-sm text-ellipsis overflow-hidden">
                    {data.description}
                </p>
            </CardContent>

            <CardFooter className="flex justify-center px-4 mt-2">
                <Link to={`book/${data.id}`}>
                    <Button variant="default" className="px-6 py-2 text-sm font-semibold cursor-pointer">
                        View Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default BookCard;
