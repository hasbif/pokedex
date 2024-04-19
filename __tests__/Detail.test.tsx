import {fireEvent, render, screen} from '@testing-library/react'
import Detail from '@/app/pokemon/[id]/page'

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('detail pages', ()=>{
  it('should have navbar', async()=>{
    const ui = await Detail({params: {id: "1"}})
    render(ui) //Arrange
  
    const myElement = screen.getByTestId('logoIcon') //Act
  
    expect(myElement).toBeInTheDocument() // Assert
  })
  
  it('should have name', async()=>{
    const ui = await Detail({params: {id: "1"}})
    render(ui) //Arrange
  
    const myElement = screen.getByRole('detailImage') //Act
  
    expect(myElement).toBeInTheDocument() // Assert
  })
  
  it('should have name info', async()=>{
    const ui = await Detail({params: {id: "1"}})
    render(ui) //Arrange
  
    const myElement = screen.getByRole('detailName') //Act
  
    expect(myElement).toBeInTheDocument() // Assert
  })

  it('should have more details info', async()=>{
    const ui = await Detail({params: {id: "1"}})
    render(ui) //Arrange
  
    const myElement = screen.getByRole('detailInfo') //Act
  
    expect(myElement).toBeInTheDocument() // Assert
  })

})

