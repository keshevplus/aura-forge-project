import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Code2, 
  Palette, 
  Smartphone, 
  Globe, 
  Zap, 
  Heart,
  Calendar,
  MapPin,
  Award
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: "Frontend Development", level: 95, icon: Code2, color: "text-blue-500" },
    { name: "UI/UX Design", level: 88, icon: Palette, color: "text-purple-500" },
    { name: "Mobile Development", level: 82, icon: Smartphone, color: "text-green-500" },
    { name: "Web Technologies", level: 92, icon: Globe, color: "text-orange-500" },
    { name: "Performance Optimization", level: 85, icon: Zap, color: "text-yellow-500" },
    { name: "User Experience", level: 90, icon: Heart, color: "text-red-500" },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      description: "Leading development of enterprise web applications with React, Node.js, and cloud infrastructure.",
    },
    {
      year: "2022",
      title: "Frontend Team Lead",
      company: "Digital Solutions Co.",
      description: "Managed a team of 5 developers, implemented design systems, and improved application performance by 40%.",
    },
    {
      year: "2020",
      title: "Software Developer",
      company: "StartupXYZ",
      description: "Built responsive web applications, collaborated with design teams, and contributed to product strategy.",
    },
    {
      year: "2018",
      title: "Computer Science Graduate",
      company: "University of Technology",
      description: "Graduated with honors, specialized in software engineering and human-computer interaction.",
    },
  ];

  const technologies = [
    "React", "TypeScript", "Next.js", "Node.js", "Python", "PostgreSQL",
    "MongoDB", "AWS", "Docker", "Figma", "Tailwind CSS", "GraphQL"
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent gradient-primary">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate developer with 6+ years of experience creating digital experiences that matter. 
            I believe in the power of clean code, thoughtful design, and collaborative innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="gradient-card shadow-medium border-0 hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  My Story
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    My journey began with curiosity about how things work on the web. 
                    What started as tinkering with HTML and CSS has evolved into a 
                    passion for creating seamless digital experiences.
                  </p>
                  <p>
                    I thrive at the intersection of design and technology, where 
                    beautiful interfaces meet robust functionality. Every project 
                    is an opportunity to solve problems and delight users.
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Available for projects</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="gradient-card shadow-medium border-0 hover-lift">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Skills & Expertise
                </h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <skill.icon className={`w-5 h-5 ${skill.color}`} />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full gradient-primary"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: 0.2 + 0.1 * index }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Professional Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-center mb-12">Professional Journey</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-primary-foreground font-bold text-sm">
                      {item.year}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1 gradient-card shadow-soft border-0 hover-lift">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                      <p className="text-primary font-medium mb-3">{item.company}</p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-semibold mb-8">Technologies I Love</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 text-sm font-medium hover-lift gradient-card border-0 shadow-soft"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;