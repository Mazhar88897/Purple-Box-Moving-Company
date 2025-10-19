"use client"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Russell Gon",
    location: "New York",
    rating: 5,
    source: "Google",
    text: "From start to finish my move was a great experience. I immediately got a quote. The scheduling was easy, and they provided me with information regarding insurance coverage (and took care of the paperwork my building provided). The move itself went like clockwork. The movers arrived on time and texted me when they were on their way with an ETA to the delivery site. They moved everything up the 3 flights of stairs into my apartment quickly and safely. A great company that provides great service at very reasonable rates.",
    borderColor: "border-pink-500"
  },
  {
    id: 2,
    name: "James B.",
    location: "New York",
    rating: 5,
    source: "Yelp",
    text: " Purple Box Moving Company moved me from the Financial District to the Hudson Valley in June 2022. It was absolutely flawless. The two men that worked the moved were polite, careful, efficient and knowledgeable. Not a scratch on anything including the brand new apartment I moved into. They were focused and diligent. In Manhattan the logistics are more complicated yet purple box moving rose to the occasion in every way. What's more, the moving fee was very reasonable and there were no hidden charges, no surprises.",
    borderColor: "border-blue-900"
  },
  {
    id: 3,
    name: "Morgan Kolb",
    location: "New York",
    rating: 5,
    source: "Google",
    text: "Great move with Purple Box Moving Company movers! I rented their pink bins which was an excellent choice, they provide plenty of packing paper, zip ties, and tags. My team arrived right at the start of their arrival window and quickly and safely packed all my bins and furniture into their truck. The team just as efficiently unloaded everything, leaving the bins in the labeled rooms and re assembling my bed frame. I definitely recommend renting their bins. I would definitely use purple box moving movers again and recommend them to a friend.",
    borderColor: "border-blue-900"
  },
  {
    id: 4,
    name: "Katie B",
    location: "New York to Maryland",
    rating: 5,
    source: "Google",
    text: "Easiest moving experience ever. I had packed all my boxes myself, and the two guys came and loaded everything in 45 or so minutes. They wrapped my paintings and all of my fragile items and desk that I forgot to include in my inventory. The guys were very efficient, polite, and professional. They drove my belongings from NYC to Maryland and unpacked everything, and my parents had only good things to say of their experience with them as well. I will recommend purple box moving moving to friends & family!",
    borderColor: "border-pink-500"
  }
]

export default function ReviewsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="relative">
            {/* Purple background box */}
            <div className="absolute -bottom-4 -left-4 z-0 h-[92%] w-[92%] rounded-xl bg-purple-700" />
            
            {/* Main review card */}
            <div className={`relative z-10 bg-white rounded-xl border-2 border-purple-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}>
              {/* Rating and Source */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-purple-700 text-purple-700" />
                  ))}
                </div>
                  <div className="flex items-center">
                  
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                   
                  </div>
              </div>

              {/* Review Text */}
              <p className="text-blue-900 text-sm leading-relaxed mb-4">
                {review.text}
              </p>

              {/* Reviewer Name and Location */}
              <div className="text-blue-900 font-semibold text-sm">
                {review.name}, {review.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
