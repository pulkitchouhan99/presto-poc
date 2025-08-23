import styled from 'styled-components';
import { ThemeWrapper } from '../../components/theme-wrapper';

const Careers = () => {
  return (
    <ThemeWrapper>
      <Wrapper>
        <h1 data-testid='page-heading'>Join our team</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam interdum elit arcu, sed scelerisque justo
          pulvinar ac. Aliquam varius dignissim erat, lacinia sollicitudin arcu convallis sed. Maecenas facilisis arcu
          vel augue lobortis, a facilisis nulla facilisis. Ut faucibus, elit vel semper accumsan, nunc leo euismod
          purus, vel volutpat erat ex a magna. Aenean posuere tellus vel lorem interdum, vitae ullamcorper odio
          bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed
          vitae ipsum leo. Integer ut erat turpis. Fusce sollicitudin justo nec nisi malesuada pretium. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras nec facilisis turpis, id
          pretium lacus. Duis sed dolor nec leo tincidunt vestibulum. Duis vel pellentesque diam. Duis quis diam ligula.
        </p>

        <p>
          Proin rhoncus, augue nec commodo rutrum, nunc risus finibus est, sit amet laoreet sem erat nec metus. Proin
          nibh dui, semper in scelerisque a, laoreet a dui. Mauris mattis dui eget augue sollicitudin, at posuere metus
          volutpat. In turpis metus, pretium ut vehicula tristique, ultrices ut sapien. Sed dapibus ex vel tellus
          rhoncus ultricies. In hac habitasse platea dictumst. Nunc dignissim, dui eget tincidunt maximus, lacus libero
          scelerisque felis, ac congue nulla ipsum at lacus. Donec mollis sed tortor et sodales. Aliquam facilisis
          vehicula mi id semper. Phasellus commodo quis est viverra scelerisque. Duis fermentum diam nisi, ut ornare dui
          consectetur et. Nunc nec pellentesque magna, eget tristique lorem. Mauris vel ligula pretium, mattis neque
          elementum, tristique leo.
        </p>

        <p>
          Morbi fermentum ipsum enim, quis venenatis felis pulvinar eget. Proin sed tempor metus. Proin maximus posuere
          hendrerit. Nam ultrices interdum lorem quis molestie. Vivamus maximus mauris id ligula condimentum, vel
          consectetur orci semper. Phasellus blandit dolor urna, vitae blandit dolor porta nec. Pellentesque euismod
          hendrerit tempor. In a mattis dui. Ut finibus lobortis risus vitae laoreet. In id elit scelerisque, sagittis
          massa eu, feugiat massa. In finibus imperdiet ex, vel viverra enim varius ut. Vestibulum interdum sodales
          lorem. Donec pellentesque dolor libero. Integer congue, nisi ut pulvinar ullamcorper, nisi enim molestie
          dolor, sed ornare ante enim a lacus. Quisque sollicitudin, nisi id tempus fermentum, ipsum orci sollicitudin
          nisi, et dapibus magna magna non dolor. Donec sollicitudin massa vestibulum est placerat feugiat.
        </p>
      </Wrapper>
    </ThemeWrapper>
  );
};

export default Careers;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 768px;
  padding: ${({ theme }) => theme.spacing[24]};
`;
