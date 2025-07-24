import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface RatingSliderProps {
    onRatingChange: (rating: number) => void;
    initialValue?: number;
}

export function RatingSlider({ onRatingChange, initialValue = 5 }: RatingSliderProps) {
    const [value, setValue] = useState([initialValue]);

    const handleValueChange = (newValue: number[]) => {
        setValue(newValue);
        onRatingChange(newValue[0]);
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Your Rating (1-10)
            </label>
            <div className="flex items-center space-x-4">
                <Slider
                    value={value}
                    onValueChange={handleValueChange}
                    min={1}
                    max={10}
                    step={1}
                    className="flex-1"
                />
                <span className="text-lg font-semibold text-primary w-8 text-center">
          {value[0]}
        </span>
            </div>
        </div>
    );
}