import React from 'react';
import { CATEGORIES, CATEGORY_DETAILS } from '../constants';

interface CategoryNavProps {
    onCategorySelect: (categoryName: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ onCategorySelect }) => {
    // Move 'Ofertas' to the beginning
    const sortedCategories = [...CATEGORIES].sort((a, b) => {
        if (a.name === 'Ofertas') return -1;
        if (b.name === 'Ofertas') return 1;
        return 0;
    });


    return (
        <nav>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
                <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                {sortedCategories.map(category => {
                    const details = CATEGORY_DETAILS[category.name];
                    
                    if (!details?.imageUrl) return null;

                    return (
                        <div 
                            key={category.id} 
                            onClick={() => onCategorySelect(category.name)}
                            className="flex flex-col items-center justify-start flex-shrink-0 w-20 gap-2 cursor-pointer group"
                            role="button"
                            tabIndex={0}
                            aria-label={category.name}
                        >
                            <img
                                src={details.imageUrl}
                                alt={category.name}
                                className="w-16 h-16 rounded-lg object-contain transition-transform duration-200 group-hover:scale-105 bg-gray-100 p-1 shadow-sm"
                                loading="lazy"
                            />
                            <p className="text-xs text-center font-semibold text-gray-700">{category.name}</p>
                        </div>
                    )
                })}
            </div>
        </nav>
    );
};

export default CategoryNav;