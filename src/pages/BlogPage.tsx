import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from 'react-helmet-async';

// Blog post type definition
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;

  imageUrl: string;
  content?: {
    introduction: string;
    keyPoints: string[];
    sections: Array<{
      title: string;
      content: string;
    }>;
    conclusion: string;
    references?: string[];
  };
  author: string;
  authorCredentials?: string;
  date: string;
  featured?: boolean;
  tags?: string[];
}

// Sample blog posts data (you can move this to a separate data file later)
const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Understanding BMI: Beyond the Numbers",
    excerpt: "Discover why BMI is just one piece of the health puzzle. Learn about body composition, muscle mass impact, and how factors like age, gender, and ethnicity affect BMI interpretation. Get practical tips for a holistic health assessment.",
    category: "Health Insights",

    imageUrl: import.meta.env.BASE_URL + 'blog/bmi-understanding.jpg',
    author: "Dr. Sarah Johnson",
    authorCredentials: "MD, PhD in Endocrinology, Certified Nutrition Specialist",
    date: "April 20, 2025",
    content: {
      introduction: "Body Mass Index (BMI) has long been used as a standard measure of health, but modern medical science reveals it's just one piece of a much larger puzzle. This comprehensive guide explores the nuances of BMI interpretation and introduces more sophisticated methods of assessing body composition and overall health.",
      keyPoints: [
        "BMI limitations and why they matter",
        "Impact of age, gender, and ethnicity on BMI interpretation",
        "Alternative methods for body composition assessment",
        "Holistic approach to health evaluation"
      ],
      sections: [
        {
          title: "The History and Evolution of BMI",
          content: "BMI was developed in the 1830s by Belgian mathematician Adolphe Quetelet. Originally called the Quetelet Index, it was designed to provide a simple measure for estimating the degree of obesity of the general population. However, it wasn't until the latter half of the 20th century that BMI became widely used in medical practice. Understanding this historical context helps explain both its usefulness and limitations."
        },
        {
          title: "Understanding BMI's Limitations",
          content: "BMI calculations don't distinguish between muscle mass, bone density, and fat content. Athletes with high muscle mass often fall into the 'overweight' category despite having low body fat percentages. Conversely, elderly individuals might have a 'normal' BMI while having low muscle mass and high body fat percentage, a condition known as sarcopenic obesity."
        },
        {
          title: "The Role of Body Composition",
          content: "Modern research emphasizes the importance of body composition over simple weight metrics. Fat distribution patterns, particularly visceral fat versus subcutaneous fat, play a crucial role in health outcomes. Methods like DEXA scans, bioelectrical impedance, and hydrostatic weighing provide more accurate assessments of body composition."
        },
        {
          title: "Cultural and Ethnic Considerations",
          content: "Different ethnic groups may have different healthy BMI ranges. For example, Asian populations often develop health risks at lower BMI values compared to Western populations. The World Health Organization has acknowledged these differences and recommends different BMI cutoff points for different ethnic groups."
        }
      ],
      conclusion: "While BMI remains a useful screening tool at the population level, individual health assessments should incorporate multiple metrics including body composition analysis, waist circumference, and other health markers. Consult with healthcare professionals to develop a comprehensive understanding of your body composition and overall health status.",
      references: [
        "World Health Organization (2024) - BMI Classification Global Database",
        "Journal of Sports Medicine (2024) - Body Composition Assessment in Athletes",
        "International Journal of Obesity (2023) - Ethnic-specific BMI Cutoff Points",
        "American Journal of Clinical Nutrition (2024) - Modern Approaches to Body Composition Analysis"
      ]
    },
    tags: ["BMI", "Body Composition", "Health Assessment", "Nutrition", "Fitness"],
    featured: true
  },
  {
    id: 2,
    title: "The Science of Heart Rate Zones",
    excerpt: "Master the science of heart rate training zones. Understand aerobic vs. anaerobic exercise, calculate your target zones, and learn how to optimize workouts for fat burning, endurance, and cardiovascular health.",
    category: "Fitness",

    imageUrl: import.meta.env.BASE_URL + 'blog/heart-rate-zones.jpg',
    author: "Dr. Michael Chen",
    authorCredentials: "MD, Sports Medicine Specialist, Exercise Physiologist",
    date: "April 18, 2025",
    content: {
      introduction: "Understanding heart rate training zones is crucial for optimizing your workouts and achieving specific fitness goals. This comprehensive guide explores the science behind heart rate zones, how to calculate your personal zones, and how to use them effectively in your training program.",
      keyPoints: [
        "Understanding the five heart rate training zones",
        "How to calculate your maximum heart rate and training zones",
        "Benefits of training in different zones",
        "Heart rate monitoring technology and tools",
        "Sample workouts for different fitness goals"
      ],
      sections: [
        {
          title: "The Five Heart Rate Training Zones",
          content: "Heart rate training zones are typically divided into five zones, each serving a specific purpose. Zone 1 (50-60% of max HR) is for recovery and warm-up, Zone 2 (60-70%) builds basic endurance, Zone 3 (70-80%) improves aerobic capacity, Zone 4 (80-90%) increases maximum performance force, and Zone 5 (90-100%) develops maximum performance and speed."
        },
        {
          title: "Calculating Your Zones",
          content: "While the traditional formula (220 - age) provides a rough estimate of maximum heart rate, more accurate methods exist. The Karvonen formula considers resting heart rate for more precise calculations. Modern fitness assessments can provide even more accurate data through controlled testing protocols."
        },
        {
          title: "Zone-Specific Benefits",
          content: "Each training zone offers unique benefits. Lower zones (1-2) are excellent for fat burning and building endurance. Middle zones (3) help improve aerobic capacity and efficiency. Higher zones (4-5) enhance anaerobic capacity, speed, and power. A well-rounded training program incorporates all zones appropriately."
        },
        {
          title: "Monitoring Technology",
          content: "Modern heart rate monitors range from chest straps to optical wrist sensors. While chest straps generally provide more accurate readings, wrist-based monitors have improved significantly. Many devices now offer real-time zone tracking and detailed post-workout analysis."
        },
        {
          title: "Training Program Design",
          content: "Effective heart rate training programs balance time spent in different zones based on your goals. Endurance athletes might spend more time in Zones 2-3, while those focusing on speed and power might incorporate more Zone 4-5 intervals. Recovery periods in Zone 1 are crucial for all training programs."
        }
      ],
      conclusion: "Heart rate zone training is a powerful tool for optimizing your workouts and achieving specific fitness goals. By understanding and properly implementing these zones in your training, you can improve efficiency, reduce injury risk, and maximize results. Remember to gradually progress your training and listen to your body's signals.",
      references: [
        "Journal of Sports Science (2024) - Heart Rate Zone Training and Performance",
        "Medicine & Science in Sports & Exercise (2024) - Modern Heart Rate Monitoring Methods",
        "International Journal of Sports Physiology (2023) - Zone Training Protocols",
        "American College of Sports Medicine (2024) - Guidelines for Exercise Testing"
      ]
    },
    tags: ["Heart Rate", "Fitness", "Training Zones", "Exercise Science", "Cardiovascular Health"],
    featured: true
  },
  {
    id: 3,
    title: "Nutrition Myths Debunked",
    excerpt: "Debunk popular nutrition myths with evidence-based research. From carbs and fats to superfoods and supplements, learn what scientific studies really say about diet, metabolism, and sustainable eating habits.",
    category: "Nutrition",

    imageUrl: import.meta.env.BASE_URL + 'blog/nutrition-myths.jpg',
    author: "Dr. Emily White",
    date: "April 15, 2025",
    featured: true
  },
  {
    id: 4,
    title: "Sleep Quality and Mental Health",
    excerpt: "Explore the intricate relationship between sleep and mental health. Learn about sleep cycles, circadian rhythms, and how quality rest impacts mood, cognitive function, and emotional resilience. Get practical tips for better sleep hygiene.",
    category: "Mental Health",

    imageUrl: import.meta.env.BASE_URL + 'blog/stress-management.jpg',
    author: "Dr. James Wilson",
    date: "April 12, 2025"
  },
  {
    id: 5,
    title: "Understanding Blood Pressure Readings",
    excerpt: "Master the essentials of blood pressure monitoring. Understand systolic and diastolic readings, learn about factors affecting blood pressure, and discover lifestyle modifications for maintaining optimal cardiovascular health.",
    category: "Heart Health",

    imageUrl: import.meta.env.BASE_URL + 'blog/blood-pressure.jpg',
    author: "Dr. Patricia Martinez",
    date: "April 10, 2025"
  },
  {
    id: 6,
    title: "The Role of Hydration in Health",
    excerpt: "Dive deep into the science of hydration. Learn how water balance affects organ function, athletic performance, and cognitive ability. Get practical guidelines for daily intake and recognize signs of dehydration.",
    category: "Wellness",

    imageUrl: import.meta.env.BASE_URL + 'blog/hydration.jpg',
    author: "Dr. Maria Rodriguez",
    date: "April 8, 2025"
  },
  {
    id: 7,
    title: "Stress Management Techniques",
    excerpt: "Discover scientifically-proven techniques for stress management. From mindfulness and meditation to exercise and cognitive behavioral strategies, learn how to build resilience and maintain emotional balance.",
    category: "Mental Health",

    imageUrl: import.meta.env.BASE_URL + 'blog/stress-management.jpg',
    author: "Dr. David Lee",
    date: "April 6, 2025"
  },
  {
    id: 8,
    title: "Diabetes Management Essentials",
    excerpt: "Comprehensive guide to diabetes management. Learn about blood glucose monitoring, medication management, diet planning, and lifestyle modifications. Understand how to prevent complications and maintain optimal health with diabetes.",
    category: "Diabetes Care",

    imageUrl: import.meta.env.BASE_URL + 'blog/sleep-quality.jpg',
    author: "Dr. Thomas Brown",
    authorCredentials: "MD, Endocrinologist, Certified Diabetes Educator",
    date: "April 4, 2025",
    content: {
      introduction: "Diabetes management is a complex but achievable task that requires understanding multiple aspects of health care. This comprehensive guide will walk you through the essential components of diabetes management, from blood glucose monitoring to lifestyle modifications, helping you take control of your health journey.",
      keyPoints: [
        "Understanding blood glucose monitoring and target ranges",
        "Medication management and insulin therapy basics",
        "Nutrition planning and carbohydrate counting",
        "Exercise guidelines for diabetics",
        "Preventing and managing complications"
      ],
      sections: [
        {
          title: "Blood Glucose Monitoring Essentials",
          content: "Regular blood glucose monitoring is the cornerstone of diabetes management. Learn to use your glucose meter effectively, understand your target ranges, and recognize patterns in your readings. Modern continuous glucose monitoring (CGM) systems can provide real-time data and alerts, helping you make informed decisions about your diabetes care. Keeping detailed records helps you and your healthcare team adjust your treatment plan as needed."
        },
        {
          title: "Medication Management and Insulin Therapy",
          content: "Different types of diabetes medications work in various ways to control blood sugar. For those requiring insulin, understanding the differences between rapid-acting, short-acting, intermediate-acting, and long-acting insulin is crucial. Learn about proper storage, injection techniques, and timing of medications. Always consult with your healthcare provider before making any changes to your medication regimen."
        },
        {
          title: "Nutrition Planning and Meal Timing",
          content: "A balanced diet is crucial for diabetes management. Understanding carbohydrate counting, portion control, and the glycemic index helps you make informed food choices. Meal timing plays a significant role in blood sugar control. Work with a registered dietitian to create a personalized meal plan that fits your lifestyle and helps maintain stable blood sugar levels."
        },
        {
          title: "Exercise and Physical Activity Guidelines",
          content: "Regular physical activity improves insulin sensitivity and helps maintain healthy blood sugar levels. However, exercise can affect blood sugar in different ways. Learn how to monitor your levels before, during, and after exercise, and understand how different types of activities impact your blood sugar. Always carry fast-acting carbohydrates during exercise to treat potential low blood sugar."
        },
        {
          title: "Preventing and Managing Complications",
          content: "Long-term diabetes management includes regular screening for complications affecting the eyes, kidneys, nerves, and cardiovascular system. Understanding the warning signs of both high and low blood sugar is crucial. Develop a sick-day management plan with your healthcare team, and know when to seek emergency care."
        }
      ],
      conclusion: "Successful diabetes management requires dedication, knowledge, and support. Remember that small, consistent steps lead to significant improvements in your health. Work closely with your healthcare team, stay informed about the latest developments in diabetes care, and connect with support groups to share experiences and strategies.",
      references: [
        "American Diabetes Association (2024) - Standards of Medical Care in Diabetes",
        "Journal of Clinical Endocrinology & Metabolism (2024) - Advances in Diabetes Management",
        "Diabetes Care (2023) - Guidelines for Exercise in Type 2 Diabetes",
        "The Lancet (2024) - Modern Approaches to Diabetes Management"
      ]
    },
    tags: ["Diabetes", "Blood Sugar", "Medication Management", "Nutrition", "Exercise"]
  },
  {
    id: 9,
    title: "Understanding Cholesterol Levels",
    excerpt: "Master cholesterol management with our in-depth guide. Understand HDL vs. LDL, triglycerides, and how diet, exercise, and genetics affect your lipid profile. Learn evidence-based strategies for heart health.",
    category: "Heart Health",

    imageUrl: import.meta.env.BASE_URL + 'blog/cholesterol.jpg',
    author: "Dr. Robert Kim",
    date: "April 2, 2025"
  },
  {
    id: 10,
    title: "The Benefits of Regular Exercise",
    excerpt: "Explore the science behind exercise benefits. From strength training to cardio, learn how different workout types affect muscle growth, bone density, metabolism, and mental health. Get tips for creating a balanced fitness routine.",
    category: "Fitness",

    imageUrl: import.meta.env.BASE_URL + 'blog/exercise-benefits.jpg',
    author: "Dr. Sarah Thompson",
    date: "March 31, 2025"
  },
  {
    id: 11,
    title: "Mental Health and Physical Wellness",
    excerpt: "Understand the powerful mind-body connection. Explore how mental health affects physical well-being and vice versa. Learn about psychosomatic responses, stress impact on health, and holistic wellness strategies.",
    category: "Mental Health",

    imageUrl: import.meta.env.BASE_URL + 'blog/mental-physical.jpg',
    author: "Dr. Lisa Anderson",
    date: "March 29, 2025"
  }
];

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link key={post.id} to={`/blog/${post.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-200 group-hover:border-primary/30">
        <div className="aspect-[16/9] overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            width={600}
            height={338}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover transition-all duration-300 opacity-100 group-hover:scale-105"
            style={{ backgroundImage: 'linear-gradient(to bottom right, #f1f5f9, #e2e8f0)' }}
            onError={(e) => {
              e.currentTarget.src = import.meta.env.BASE_URL + 'placeholder.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="secondary" className="font-medium text-xs sm:text-sm">
              {post.category}
            </Badge>

          </div>
          <h2 className="font-medium text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 mb-4">
            {post.excerpt}
          </p>
          {post.author && post.date && (
            <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mt-4 pt-4 border-t">
              <span className="truncate">{post.author}</span>
              <span className="shrink-0 ml-2">{post.date}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Medical Blog & Resources | VitalMetrics</title>
        <meta name="description" content="Stay informed with the latest health insights, medical research updates, and expert knowledge from healthcare professionals." />
      </Helmet>

      <div className="container px-4 md:px-6 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground">Blog</span>
        </nav>
        {/* Header */}
        <div className="container px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Medical Blog & Resources</h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                Expert insights, research updates, and practical health knowledge from medical
                professionals. Stay informed with our comprehensive health guides.
              </p>
            </div>
          </div>
        </div>
        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {useMemo(() => 
            allBlogPosts
              .sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
              .map((post) => <BlogCard key={post.id} post={post} />)
          , [allBlogPosts])}
        </div>
      </div>
    </>
  );
}
