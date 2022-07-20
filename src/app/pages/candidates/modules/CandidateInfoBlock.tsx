import {FC, useEffect} from 'react'

interface ICandidateInfoBlock {
  id?: number
  setEditUser?: any
  user?: any
  labelW?: number
  inputW?: number
}

const CandidateInfoBlock: FC<ICandidateInfoBlock> = ({id, setEditUser, user, labelW, inputW}) => {
  useEffect(() => {
    if (user.location && user.location.length < 2) {
      setEditUser((user: {location: string[]}) => ({...user, location: [...user.location, '']}))
    }
  }, [user.location, setEditUser])

  return (
    <div className='col-lg-12 mb-10 pe-4'>
      <div className='row name d-flex justify-content-between align-items-center mb-4'>
        <label
          htmlFor='exampleFormControlInput1'
          className={'col-lg-' + labelW + ' required form-label fw-normal mb-4 fs-6'}
        >
          Ім'я
        </label>
        <div
          className={'col-lg-' + inputW + ' d-flex justify-content-between flex-column flex-lg-row'}
        >
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 mb-4 h-40px'
            placeholder="Ім'я"
            value={user.firstName}
            onChange={(e) => setEditUser((user: object) => ({...user, firstName: e.target.value}))}
          />
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 h-40px'
            placeholder='Прізвище'
            value={user.lastName}
            onChange={(e) => setEditUser((user: object) => ({...user, lastName: e.target.value}))}
          />
        </div>
      </div>
      <div className='row name d-flex justify-content-between align-items-center mb-4'>
        <label
          htmlFor='exampleFormControlInput1'
          className={'col-lg-' + labelW + ' form-label fw-normal mb-4 fs-6'}
        >
          Місцезнаходження
        </label>
        <div
          className={'col-lg-' + inputW + ' d-flex justify-content-between flex-column flex-lg-row'}
        >
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 mb-4 h-40px'
            placeholder='Країна'
            value={user.location && user.location.length > 0 ? user.location[0] : ''}
            onChange={(e) =>
              setEditUser((user: {location: string[]}) => ({
                ...user,
                location: [
                  ...user.location.map((str: string, i: number) => {
                    return i === 0 ? e.target.value : str
                  }),
                ],
              }))
            }
          />
          <input
            type='text'
            className='form-control form-control-solid w-lg-47 h-40px'
            placeholder='Місто'
            value={user.location && user.location.length > 0 ? user.location[1] : ''}
            onChange={(e) =>
              setEditUser((user: {location: string[]}) => ({
                ...user,
                location: [
                  ...user.location.map((str: string, i: number) => {
                    return i === 1 ? e.target.value : str
                  }),
                ],
              }))
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CandidateInfoBlock
