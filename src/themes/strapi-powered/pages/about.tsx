import styled from 'styled-components';
import { RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

const AboutContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const HeroSection = styled.section<{ backgroundImage?: string }>`
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  color: white;
  text-align: center;

  ${(props) =>
    props.backgroundImage &&
    `
    background-image: url(${props.backgroundImage});
    background-size: cover;
    background-position: center;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  `}
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const SectionRow = styled.div<{ layout?: 'text-left' | 'text-right' | 'centered' }>`
  display: grid;
  grid-template-columns: ${(props) => (props.layout === 'centered' ? '1fr' : '1fr 1fr')};
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  ${(props) =>
    props.layout === 'text-right' &&
    `
    & > *:first-child {
      order: 2;
    }
    & > *:last-child {
      order: 1;
    }
    
    @media (max-width: 768px) {
      & > * {
        order: unset;
      }
    }
  `}

  ${(props) =>
    props.layout === 'centered' &&
    `
    text-align: center;
  `}
`;

const TextContent = styled.div``;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  white-space: pre-wrap;
`;


const TeamSection = styled.section`
  background-color: white;
  padding: 4rem 2rem;
`;

const TeamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MemberImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #666;
`;

const MemberName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const MemberRole = styled.p`
  font-size: 1rem;
  color: #007bff;
  margin-bottom: 1rem;
`;

const MemberBio = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
`;

const About: RemoteBoundaryComponent = () => {
  const aboutData = {
    hero: {
      title: 'About Us',
      subtitle: 'Learn more about our mission and values',
      backgroundImage: undefined,
    },
    sections: [
      {
        title: 'Our Story',
        content:
          'Founded with a passion for quality cannabis products, we have been serving our community with dedication and expertise. Our journey began with a simple mission: to provide safe, high-quality cannabis products while educating our customers about their benefits.',
        layout: 'text-left' as const,
      },
      {
        title: 'Our Mission',
        content:
          'We are committed to providing the highest quality cannabis products while maintaining the highest standards of customer service. We believe in transparency, education, and building lasting relationships with our community.',
        layout: 'centered' as const,
      },
      {
        title: 'Quality Promise',
        content:
          'Every product in our store is carefully selected and tested to ensure it meets our strict quality standards. We work directly with trusted growers and manufacturers who share our commitment to excellence.',
        layout: 'text-right' as const,
      },
    ],
    team: {
      title: 'Meet Our Team',
      members: [
        {
          name: 'John Doe',
          role: 'Founder & CEO',
          bio: 'Passionate about cannabis education and community building.',
        },
        {
          name: 'Jane Smith',
          role: 'Head of Operations',
          bio: 'Ensuring smooth operations and exceptional customer experiences.',
        },
        {
          name: 'Mike Johnson',
          role: 'Product Specialist',
          bio: 'Expert in cannabis products with years of industry experience.',
        },
      ],
    },
  };

  return (
    <AboutContainer>
      <HeroSection backgroundImage={aboutData.hero.backgroundImage}>
        <HeroContent>
          <HeroTitle>{aboutData.hero.title}</HeroTitle>
          {aboutData.hero.subtitle && <HeroSubtitle>{aboutData.hero.subtitle}</HeroSubtitle>}
        </HeroContent>
      </HeroSection>

      <ContentSection>
        {aboutData.sections.map((section, index) => (
          <SectionRow key={index} layout={section.layout}>
            <TextContent>
              <SectionTitle>{section.title}</SectionTitle>
              <SectionText>{section.content}</SectionText>
            </TextContent>
            {/* Image would go here if section had image property */}
          </SectionRow>
        ))}
      </ContentSection>

      {aboutData.team && (
        <TeamSection>
          <TeamContainer>
            <TeamTitle>{aboutData.team.title}</TeamTitle>
            <TeamGrid>
              {aboutData.team.members.map((member, index) => (
                <TeamMember key={index}>
                  <MemberImage>{member.name.charAt(0)}</MemberImage>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  {member.bio && <MemberBio>{member.bio}</MemberBio>}
                </TeamMember>
              ))}
            </TeamGrid>
          </TeamContainer>
        </TeamSection>
      )}
    </AboutContainer>
  );
};

About.DataBridgeVersion = '1';

export default About;
