import {fireEvent, render, screen} from '@testing-library/react'
import Compare from '@/app/compare/[ids]/page'

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('compare pages', ()=>{
  it('should have navbar', async()=>{
    const ui = await Compare({params: {ids: "1-2-3"}})
    render(ui) //Arrange
  
    const myElement = screen.getByTestId('logoIcon') //Act
  
    expect(myElement).toBeInTheDocument() // Assert
  })
  
  it('should have name', async()=>{
    const ui = await Compare({params: {ids: "1-2-3"}})
    render(ui) //Arrange
  
    const myElement = screen.getAllByRole('detailImage') //Act
  
    myElement.forEach(element => {
      expect(element).toBeInTheDocument()
    });
  })
  
  it('should have name info', async()=>{
    const ui = await Compare({params: {ids: "1-2-3"}})
    render(ui) //Arrange
  
    const myElement = screen.getAllByRole('detailName') //Act
  
    myElement.forEach(element => {
      expect(element).toBeInTheDocument()
    });
  })

  it('should have more details info', async()=>{
    const ui = await Compare({params: {ids: "1-2-3"}})
    render(ui) //Arrange
  
    const myElement = screen.getAllByRole('detailInfo') //Act
    myElement.forEach(element => {
      expect(element).toBeInTheDocument()
    });
  })

})

