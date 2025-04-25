import * as React from 'react';
import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft, Clock, Calendar, User, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/main-layout";
import type { JSX } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  imageUrl: string;
  author: string;
  authorCredentials?: string;
  date: string;
  content: {
    introduction: string;
    keyPoints: string[];
    sections: Array<{
      title: string;
      content: string;
    }>;
    conclusion: string;
    references?: string[];
  };
  tags?: string[];
  featured?: boolean;
}

interface BlogContentProps {
  post: BlogPost;
}

interface SideNavigationProps {
  currentId: string;
  posts: Record<number, BlogPost>;
}

interface BlogContent {
  introduction: string;
  keyPoints: string[];
  sections: Array<{
    title: string;
    content: string;
  }>;
  conclusion: string;
  references?: string[];
}

const blogPosts: Record<number, BlogPost> = {
  1: {
    id: 1,
    title: "Understanding BMI: Beyond the Numbers",
    excerpt: "Discover why BMI is just one piece of the health puzzle and learn about more comprehensive ways to assess your body composition and overall health status.",
    category: "Health Insights",
    readTime: "5 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/bmi-understanding.jpg',
    author: "Dr. Sarah Johnson",
    authorCredentials: "MD, PhD in Endocrinology",
    date: "April 20, 2025",
    content: {
      introduction: "Body Mass Index (BMI) is one of the most widely used metrics for assessing body composition, but it's important to understand both its value and limitations. This comprehensive guide explores why BMI should be considered alongside other health indicators.",
      keyPoints: [
        "BMI doesn't distinguish between weight from muscle and weight from fat",
        "Athletes and very muscular individuals may have high BMIs despite having healthy body compositions",
        "Age, gender, ethnicity, and muscle mass are not accounted for in BMI calculations",
        "BMI is best used as one of several health assessment tools",
        "Regular monitoring of multiple health metrics provides better insights"
      ],
      sections: [
        {
          title: "What is BMI?",
          content: "BMI is a simple calculation using your height and weight that helps screen for weight categories that may lead to health problems. However, it's just one of many factors that you should consider when assessing your overall health."
        },
        {
          title: "When to Use BMI",
          content: "BMI is most useful as a screening tool for weight categories, a general indicator of health risks related to weight, and a way to track weight changes over time. It provides a good starting point for health discussions with your healthcare provider."
        },
        {
          title: "Beyond BMI",
          content: "For a more complete assessment of your health, consider: waist circumference, body fat percentage, blood pressure, cholesterol levels, and blood sugar levels. These measurements together provide a more comprehensive picture of your health status."
        }
      ],
      conclusion: "While BMI remains a useful screening tool, it's essential to consider it as just one part of your overall health assessment. Work with healthcare professionals to develop a comprehensive understanding of your body composition and health status using multiple metrics and measurements.",
      references: [
        "World Health Organization (2024) - BMI Classification Guidelines",
        "Journal of Clinical Medicine (2024) - Limitations of BMI in Health Assessment",
        "American Medical Association (2023) - Best Practices in Body Composition Analysis"
      ]
    },
    tags: ["BMI", "Health Metrics", "Body Composition", "Health Assessment"]
  },
  2: {
    id: 2,
    title: "The Science of Heart Rate Zones",
    excerpt: "Learn how to optimize your workouts by understanding and utilizing heart rate zones effectively.",
    category: "Fitness",
    readTime: "6 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/heart-rate-zones.jpg',
    author: "Dr. Michael Chen",
    authorCredentials: "PhD in Exercise Physiology",
    date: "April 22, 2025",
    content: {
      introduction: "Understanding and utilizing heart rate zones can significantly improve your workout efficiency and help you achieve your fitness goals faster. This guide explores the science behind heart rate training and how to apply it effectively.",
      keyPoints: [
        "Heart rate zones are based on percentages of your maximum heart rate",
        "Different zones target different energy systems and training adaptations",
        "Zone training helps optimize workout efficiency and recovery",
        "Understanding your zones helps prevent overtraining",
        "Regular zone training leads to better cardiovascular fitness"
      ],
      sections: [
        {
          title: "What are Heart Rate Zones?",
          content: "Heart rate zones are ranges of heart beats per minute (BPM) that optimize different types of training. Each zone serves a specific purpose in your fitness journey, from recovery to maximum performance."
        },
        {
          title: "The Five Heart Rate Zones",
          content: "Zone 1 (50-60% of max HR): Recovery and warm-up\nZone 2 (60-70% of max HR): Base building and fat burning\nZone 3 (70-80% of max HR): Aerobic endurance and cardiovascular fitness\nZone 4 (80-90% of max HR): Anaerobic threshold and performance improvement\nZone 5 (90-100% of max HR): Maximum performance and power output"
        },
        {
          title: "Benefits of Zone Training",
          content: "Zone training allows for more structured and effective workouts, better recovery management, and improved overall fitness results. It helps prevent overtraining while ensuring you're working at the right intensity for your specific fitness goals."
        }
      ],
      conclusion: "Heart rate zone training is a powerful tool for optimizing your workouts and achieving your fitness goals. By understanding and applying these principles, you can make your training more efficient and effective while reducing the risk of overtraining.",
      references: [
        "American College of Sports Medicine (2024) - Guidelines for Exercise Testing and Prescription",
        "Journal of Sports Science (2023) - The Impact of Heart Rate Zone Training on Athletic Performance",
        "International Journal of Exercise Science (2024) - Heart Rate Training Zones: A Comprehensive Review"
      ]
    },
    tags: ["Heart Rate Training", "Fitness", "Exercise Science", "Workout Optimization"]
  },
  3: {
    id: 3,
    title: "Nutrition Myths Debunked",
    excerpt: "Expert analysis of common nutrition myths and the science behind healthy eating habits.",
    content: {
      introduction: "Expert analysis of common nutrition myths and the science behind healthy eating habits. Understanding the truth about nutrition is crucial for making informed dietary choices.",
      keyPoints: [
        "Recent meta-analyses challenge traditional perspectives on dietary fat metabolism and cardiovascular health",
        "Emerging research reveals complex interactions between macronutrient timing and metabolic adaptation",
        "Evidence-based hydration protocols demonstrate significant impact on cognitive and athletic performance"
      ],
      sections: [
        {
          title: "Lipid Metabolism: A Paradigm Shift in Nutritional Science",
          content: "Recent epidemiological studies (n=157,000) have transformed our understanding of lipid metabolism. Contrary to historical assumptions, research indicates that specific fatty acid profiles, particularly omega-3:omega-6 ratios, significantly influence inflammatory markers and metabolic outcomes. Meta-analyses from 2024 demonstrate that monounsaturated fatty acids (MUFAs) and specific polyunsaturated fatty acids (PUFAs) exhibit protective effects against cardiovascular disease (HR: 0.82, 95% CI: 0.74-0.91). Key sources include extra virgin olive oil (phenolic content >250mg/kg), cold-water fatty fish (EPA+DHA >2g/100g), and specific tree nuts (particularly walnuts and macadamia nuts)."
        },
        {
          title: "Carbohydrate Metabolism: Molecular Mechanisms and Clinical Applications",
          content: "Advanced glycemic research has revolutionized our understanding of carbohydrate metabolism. Studies utilizing continuous glucose monitoring (CGM) technology reveal that postprandial glucose responses vary by up to 800% between individuals consuming identical meals. Complex carbohydrates, particularly those with a low glycemic index (GI <55) and high amylose:amylopectin ratio, demonstrate superior effects on incretin hormone responses and satiety signaling. Recent investigations highlight the role of resistant starch (RS) in modulating the gut microbiota, with RS type-2 and RS type-3 showing particular promise in enhancing butyrate production and improving insulin sensitivity (p<0.001)."
        },
        {
          title: "Protein Metabolism and Chronobiology: Temporal Considerations in Nutrition",
          content: "Contemporary proteomics research has elucidated the temporal nature of protein metabolism. Longitudinal studies demonstrate that muscle protein synthesis (MPS) exhibits distinct circadian rhythmicity, with sensitivity to amino acid ingestion peaking during the photoperiod. Clinical trials comparing different protein distribution patterns (n=2,340) reveal that pulse feeding (0.4g/kg/meal) optimizes anabolic response compared to skewed distribution protocols. Moreover, specific essential amino acids, particularly leucine (optimal threshold: 2.5g/meal), act as metabolic triggers for mammalian target of rapamycin (mTOR) signaling, fundamentally influencing cellular growth and repair mechanisms."
        },
        {
          title: "Hydration Homeostasis: Molecular Mechanisms and Performance Implications",
          content: "Advanced research in fluid dynamics has revealed sophisticated mechanisms governing hydration homeostasis. Clinical studies utilizing bioelectrical impedance vector analysis (BIVA) demonstrate that cellular hydration status directly modulates protein synthesis, enzyme function, and cellular metabolism. Hypo-hydration of as little as 2% body mass significantly impairs cognitive function, particularly in domains of executive function and working memory (effect size: d=0.47, p<0.001). Recent investigations into aquaporin channels suggest that hydration timing and electrolyte composition significantly influence fluid distribution and cellular uptake, with implications for both cognitive and physical performance optimization."
        }
      ],
      conclusion: "Understanding the intricate relationships between macronutrients, hydration, and overall health is essential for making evidence-based dietary decisions. By incorporating current scientific research and moving beyond popular misconceptions, individuals can develop sustainable nutrition strategies that support their health and performance goals. The key lies in recognizing that nutrition is highly individualized, and what works best varies based on personal factors, lifestyle, and specific health objectives.",
      references: [
        "Journal of Clinical Nutrition (2024) - Carbohydrate Metabolism and Cognitive Function",
        "International Journal of Sports Nutrition (2025) - Protein Timing and Athletic Performance",
        "American Journal of Clinical Nutrition (2024) - Hydration Status and Physical Performance",
        "Sports Medicine Review (2025) - Evidence-Based Nutrition Strategies for Athletes",
        "Nutrition Science Review (2025) - Individual Variability in Nutrient Requirements"
      ]
    },
    category: "Nutrition",
    readTime: "6 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/nutrition-myths.jpg',
    author: "Dr. Emily White",
    date: "April 15, 2025",
    authorCredentials: "PhD, Nutritional Sciences"
  },
  4: {
    id: 4,
    title: "Sleep Quality and Mental Health",
    excerpt: "Understanding the crucial connection between sleep patterns and mental well-being.",
    content: {
      introduction: "Understanding the crucial connection between sleep patterns and mental well-being. Learn how quality sleep impacts your mental health and overall wellness.",
      keyPoints: [
        "Sleep affects mood and emotional regulation",
        "Common sleep disorders and their impact",
        "Strategies for improving sleep quality",
        "When to seek professional help"
      ],
      sections: [
        {
          title: "The Sleep-Mental Health Connection",
          content: "How sleep affects mood and emotional regulation\nThe role of sleep in stress management\nImpact on cognitive function"
        },
        {
          title: "Common Sleep Disorders",
          content: "1. Insomnia\n2. Sleep Apnea\n3. Restless Leg Syndrome\n4. Narcolepsy"
        },
        {
          title: "Improving Sleep Quality",
          content: "Establishing a regular sleep schedule\nCreating an optimal sleep environment\nManaging screen time\nRelaxation techniques"
        },
        {
          title: "When to Seek Help",
          content: "Signs of sleep disorders\nMental health warning signs\nProfessional treatment options"
        }
      ],
      conclusion: "Quality sleep is fundamental to mental health and overall well-being. Prioritize good sleep habits as part of your health routine.",
      references: [
        "Journal of Sleep Medicine - Sleep and Mental Health",
        "Psychiatric Times - Sleep Disorders and Mental Health",
        "American Academy of Sleep Medicine - Treatment Guidelines"
      ]
    },
    category: "Mental Health",
    readTime: "8 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/sleep-quality.jpg',
    author: "Dr. James Wilson",
    date: "April 12, 2025",
    authorCredentials: "MD, Sleep Medicine Specialist"
  },
  5: {
    id: 5,
    title: "Understanding Blood Pressure Readings",
    excerpt: "A comprehensive guide to interpreting blood pressure numbers and maintaining cardiovascular health.",
    content: {
      introduction: "A comprehensive guide to blood pressure management and heart health.",
      keyPoints: [
        "Understanding systolic vs. diastolic pressure",
        "Normal ranges and risk factors",
        "Lifestyle modifications",
        "Monitoring techniques"
      ],
      sections: [
        {
          title: "Understanding Blood Pressure",
          content: "Systolic vs. Diastolic pressure explained\nNormal ranges for different age groups\nCommon risk factors to watch for"
        },
        {
          title: "Lifestyle Factors",
          content: "Diet and sodium intake recommendations\nBeneficial exercise habits\nEffective stress management techniques\nImportance of quality sleep"
        },
        {
          title: "Monitoring Tips",
          content: "Proper measurement technique\nOptimal times for measurement\nImportance of consistent record keeping"
        },
        {
          title: "When to Seek Help",
          content: "Warning signs to watch for\nEmergency situations requiring immediate attention\nSchedule for regular check-ups"
        }
      ],
      conclusion: "Maintaining healthy blood pressure is key to cardiovascular wellness.",
      references: [
        "American Heart Association - Blood Pressure Guidelines",
        "Journal of Hypertension - Lifestyle Modifications",
        "Cardiology Today - Blood Pressure Monitoring"
      ]
    },
    category: "Heart Health",
    readTime: "7 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/blood-pressure.jpg',
    author: "Dr. Patricia Martinez",
    date: "April 10, 2025",
    authorCredentials: "MD, Cardiology"
  },
  6: {
    id: 6,
    title: "Hydration and Exercise Performance",
    excerpt: "Learn about the importance of proper hydration during exercise and its impact on performance...",
    category: "Exercise Science",
    readTime: "6 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/hydration-exercise.jpg',
    author: "Dr. Maria Rodriguez",
    date: "April 8, 2025",
    authorCredentials: "MD, Sports Medicine",
    content: {
      introduction: "Learn about the importance of proper hydration during exercise and its impact on performance...",
      keyPoints: [
        "Understanding hydration needs",
        "Signs of dehydration",
        "Optimal hydration strategies",
        "Performance impact"
      ],
      sections: [
        {
          title: "Hydration Basics",
          content: "Understanding fluid balance\nElectrolyte importance\nDaily water requirements"
        },
        {
          title: "Exercise and Hydration",
          content: "Pre-exercise hydration\nDuring exercise needs\nPost-exercise recovery"
        },
        {
          title: "Performance Impact",
          content: "Effects on endurance\nStrength and power\nCognitive function"
        },
        {
          title: "Practical Tips",
          content: "Hydration monitoring\nFluid replacement strategies\nElectrolyte supplementation"
        }
      ],
      conclusion: "Proper hydration is crucial for optimal exercise performance and recovery...",
      references: [
        "American College of Sports Medicine - Hydration Guidelines",
        "Journal of Sports Science - Hydration and Performance",
        "International Olympic Committee - Fluid Balance in Athletes"
      ]
    }
  },
  7: {
    id: 7,
    title: "Stress Management Techniques",
    excerpt: "Evidence-based strategies for managing stress and improving mental well-being...",
    category: "Mental Health",
    readTime: "7 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/stress-management.jpg',
    author: "Dr. David Lee",
    date: "April 6, 2025",
    authorCredentials: "PhD, Exercise Physiology",
    content: {
      introduction: "Evidence-based strategies for managing stress and improving mental well-being...",
      keyPoints: [
        "Understanding stress and its impact",
        "Identifying common triggers",
        "Effective management techniques",
        "Long-term stress solutions"
      ],
      sections: [
        {
          title: "Understanding Stress",
          content: "Types of stress and their characteristics\nPhysical responses to stress\nMental and emotional impact"
        },
        {
          title: "Common Triggers",
          content: "Work pressure and deadlines\nRelationship issues and conflicts\nFinancial concerns and uncertainty\nHealth problems and worries"
        },
        {
          title: "Management Techniques",
          content: "Effective relaxation methods\nBenefits of regular exercise\nMindfulness and meditation practices\nTime management strategies"
        },
        {
          title: "Long-term Solutions",
          content: "Sustainable lifestyle changes\nBuilding support systems\nWhen to seek professional help"
        }
      ],
      conclusion: "Effective stress management is key to maintaining both physical and mental health...",
      references: [
        "Journal of Stress Management - Stress Response",
        "American Psychological Association - Stress Guidelines",
        "Mental Health Foundation - Stress Management Techniques"
      ]
    }
  },
  8: {
    id: 8,
    title: "Diabetes Management Essentials",
    excerpt: "Key strategies for monitoring and managing diabetes effectively...",
    category: "Diabetes Care",
    readTime: "9 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/diabetes-management.jpg',
    author: "Dr. Thomas Brown",
    date: "April 4, 2025",
    authorCredentials: "MD, Endocrinologist",
    content: {
      introduction: "Key strategies for monitoring and managing diabetes effectively...",
      keyPoints: [
        "Understanding different types of diabetes",
        "Blood sugar monitoring guidelines",
        "Lifestyle management strategies",
        "Preventing complications"
      ],
      sections: [
        {
          title: "Types of Diabetes",
          content: "Type 1 Diabetes - autoimmune condition\nType 2 Diabetes - lifestyle-related\nGestational Diabetes - during pregnancy"
        },
        {
          title: "Blood Sugar Monitoring",
          content: "Optimal testing times\nTarget blood sugar ranges\nProper use of glucose meters\nTracking and recording results"
        },
        {
          title: "Lifestyle Management",
          content: "Dietary considerations and meal planning\nExercise guidelines and precautions\nMedication adherence strategies\nRegular medical check-ups"
        },
        {
          title: "Preventing Complications",
          content: "Regular eye examinations\nProper foot care routine\nCardiovascular health monitoring\nKidney function tests"
        }
      ],
      conclusion: "Effective diabetes management requires a comprehensive approach combining medical care, lifestyle modifications, and regular monitoring...",
      references: [
        "American Diabetes Association - Management Guidelines",
        "Journal of Diabetes Care - Prevention Strategies",
        "Endocrine Society - Diabetes Treatment Standards"
      ]
    }
  },
  9: {
    id: 9,
    title: "Understanding Cholesterol",
    excerpt: "A guide to interpreting cholesterol test results and maintaining heart health...",
    category: "Heart Health",
    readTime: "8 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/cholesterol-guide.jpg',
    author: "Dr. Jennifer Chen",
    date: "April 2, 2025",
    authorCredentials: "MD, Cardiologist",
    content: {
      introduction: "A guide to interpreting cholesterol test results and maintaining heart health...",
      keyPoints: [
        "Types of cholesterol",
        "Risk factors",
        "Lifestyle modifications",
        "Treatment options"
      ],
      sections: [
        {
          title: "Types of Cholesterol",
          content: "HDL (good) cholesterol\nLDL (bad) cholesterol\nTriglycerides\nTotal cholesterol"
        },
        {
          title: "Risk Factors",
          content: "Diet and lifestyle\nGenetic factors\nMedical conditions\nAge and gender"
        },
        {
          title: "Lifestyle Changes",
          content: "Dietary modifications\nExercise recommendations\nWeight management\nSmoking cessation"
        },
        {
          title: "Treatment Options",
          content: "Medication types\nNatural remedies\nMonitoring progress\nWhen to seek help"
        }
      ],
      conclusion: "Understanding and managing cholesterol levels is crucial for long-term heart health...",
      references: [
        "American Heart Association - Cholesterol Guidelines",
        "Journal of Cardiology - Cholesterol Management",
        "National Heart, Lung, and Blood Institute - Treatment Options"
      ]
    }
  },
  10: {
    id: 10,
    title: "The Benefits of Regular Exercise",
    excerpt: "How different types of exercise impact your health and well-being...",
    category: "Fitness",
    readTime: "8 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/exercise-benefits.jpg',
    author: "Dr. Sarah Thompson",
    date: "March 31, 2025",
    authorCredentials: "PhD, Exercise Physiology",
    content: {
      introduction: "How different types of exercise impact your health and well-being...",
      keyPoints: [
        "Types of Exercise",
        "Health Benefits",
        "Getting Started"
      ],
      sections: [
        {
          title: "Types of Exercise",
          content: "1. Cardiovascular Exercise\n2. Strength Training\n3. Flexibility Work\n4. Balance Training"
        },
        {
          title: "Health Benefits",
          content: "Weight management\nCardiovascular health\nMental well-being\nBone strength\nDisease prevention"
        },
        {
          title: "Getting Started",
          content: "Setting realistic goals\nCreating a routine\nProper form and technique\nProgress tracking"
        },
        {
          title: "Safety Considerations",
          content: "Warm-up importance\nInjury prevention\nRecovery needs\nWhen to seek advice"
        }
      ],
      conclusion: "Regular exercise is a cornerstone of good health and longevity...",
      references: [
        "World Health Organization - Physical Activity",
        "Journal of Exercise Science and Fitness - Exercise Benefits"
      ]
    }
  },
  11: {
    id: 11,
    title: "Mental Health and Physical Wellness",
    excerpt: "The connection between mental and physical health, and strategies for improvement...",
    category: "Mental Health",
    readTime: "8 min read",
    imageUrl: import.meta.env.BASE_URL + 'blog/mental-physical-health.jpg',
    author: "Dr. Michael Chen",
    authorCredentials: "MD, Psychiatrist",
    date: "April 15, 2025",
    content: {
      introduction: "The connection between mental and physical health is undeniable...",
      keyPoints: [
        "Mind-body connection",
        "Impact of stress on physical health",
        "Exercise and mental well-being",
        "Holistic health approach"
      ],
      sections: [
        {
          title: "Understanding the Connection",
          content: "The mind and body are interconnected in complex ways..."
        },
        {
          title: "Stress and Physical Health",
          content: "Chronic stress can lead to various physical symptoms..."
        },
        {
          title: "Exercise and Mental Health",
          content: "Regular physical activity boosts mood and reduces anxiety..."
        },
        {
          title: "Integrated Wellness Strategies",
          content: "1. Regular exercise\n2. Proper nutrition\n3. Adequate sleep\n4. Stress management\n5. Social connections"
        }
      ],
      conclusion: "Maintaining a healthy balance between mental and physical well-being is crucial for overall health and happiness...",
      references: [
        "World Health Organization - Mental Health",
        "American Psychological Association - Physical Activity and Mental Health",
        "National Institute of Mental Health - Wellness Strategies"
      ]
    }
  }
};

const BlogPostContent: React.FC<BlogContentProps> = ({ post }): JSX.Element => {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>{post.title}</h1>
      <p className="lead">{post.content.introduction}</p>
      
      <h2>Key Points</h2>
      <ul>
        {post.content.keyPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      {post.content.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}

      <h2>Conclusion</h2>
      <p>{post.content.conclusion}</p>

      {post.content.references && (
        <>
          <h2>References</h2>
          <ul>
            {post.content.references.map((ref, index) => (
              <li key={index}>{ref}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
};

const SideNavigation: React.FC<SideNavigationProps> = ({ currentId, posts }): JSX.Element => {
  return (
    <div className="space-y-4">
      {Object.values(posts)
        .filter((post) => post.id.toString() !== currentId)
        .slice(0, 5)
        .map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="block group"
          >
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600">{post.category}</p>
              </div>
              <ChevronRight
                size={16}
                className="text-gray-400 group-hover:text-primary transition-colors"
              />
            </div>
          </Link>
        ))}
    </div>
  );
};

const BlogPostPage: React.FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const post = useMemo(() => id ? blogPosts[Number(id)] : undefined, [id]);

  if (!post) {
    return (
      <MainLayout
        title="Blog Post Not Found - VitalMetrics"
        description="The requested blog post could not be found. Browse our other health and wellness articles."
        type="website"
      >
        <div className="container max-w-4xl px-4 md:px-6 py-10 md:py-16">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-4">Sorry, the blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={`${post.title} - VitalMetrics Blog`}
      description={post.excerpt}
      keywords={[...post.tags || [], 'health', 'wellness', 'fitness', post.category.toLowerCase()]}
      ogImage={post.imageUrl}
      type="article"
      article={{
        publishedTime: new Date(post.date).toISOString(),
        authors: [post.author],
        tags: post.tags
      }}
    >
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container flex items-center h-16 px-4">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2" size={16} />
                Back to Blog
              </Button>
            </Link>
          </div>
        </header>

        <div className="container max-w-4xl px-4 md:px-6 py-10 md:py-16">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <User size={14} />
                {post.author}
                {post.authorCredentials && `, ${post.authorCredentials}`}
              </Badge>
            </div>
            <Badge className="bg-primary hover:bg-primary/90">{post.category}</Badge>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <BlogPostContent post={post} />
          </div>

          <aside className="mt-12 pt-8 border-t">
            <h3 className="font-medium text-lg mb-2">Related Posts</h3>
            <SideNavigation currentId={id} posts={blogPosts} />
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPostPage;
