import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BookCard = ({ data }) => {
    return (
        <Card className="shadow-lg rounded-2xl overflow-hidden border mb-2">
            <CardHeader className="relative">
                <div className="relative">
                    <img
                        src={data.image}
                        alt={data.subtitle}
                        className="h-80 w-full object-cover transition-transform duration-300 "
                    />
                </div>
                <CardTitle className="text-center font-semibold mt-4 px-2 mb-0 truncate text-xl">
                    {data.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="px-4 mb-2">
                <p className="h-16 text-gray-700 text-sm text-ellipsis overflow-hidden">
                    {data.description}
                </p>
            </CardContent>

            <CardFooter className="flex justify-center px-4 mt-2">
                <Button variant="default" className="px-6 py-2 text-sm font-semibold cursor-pointer">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default BookCard;
