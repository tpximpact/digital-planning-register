import ApplicationDetails from "@/components/application_details"
import { screen, render } from "@testing-library/react"
describe('Render ApplicationPeople', () => {
    it('should render correct', () => {
        const mockData = {
            description: 'Simple description' 
        }
        render(<ApplicationDetails {...mockData}/>)

        expect(screen.getByRole('application-description', {Name: mockData.description}));
    })
})