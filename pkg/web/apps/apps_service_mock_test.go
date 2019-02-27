// Code generated by moq; DO NOT EDIT.
// github.com/matryer/moq

package apps

import (
	"github.com/aerogear/mobile-security-service/pkg/models"
	"sync"
)

var (
	lockServiceMockGetAppByID sync.RWMutex
	lockServiceMockGetApps    sync.RWMutex
)

// Ensure, that ServiceMock does implement Service.
// If this is not the case, regenerate this file with moq.
var _ Service = &ServiceMock{}

// ServiceMock is a mock implementation of Service.
//
//     func TestSomethingThatUsesService(t *testing.T) {
//
//         // make and configure a mocked Service
//         mockedService := &ServiceMock{
//             GetAppByIDFunc: func(ID string) (*models.App, error) {
// 	               panic("mock out the GetAppByID method")
//             },
//             GetAppsFunc: func() (*[]models.App, error) {
// 	               panic("mock out the GetApps method")
//             },
//         }
//
//         // use mockedService in code that requires Service
//         // and then make assertions.
//
//     }
type ServiceMock struct {
	// GetAppByIDFunc mocks the GetAppByID method.
	GetAppByIDFunc func(ID string) (*models.App, error)

	// GetAppsFunc mocks the GetApps method.
	GetAppsFunc func() (*[]models.App, error)

	// calls tracks calls to the methods.
	calls struct {
		// GetAppByID holds details about calls to the GetAppByID method.
		GetAppByID []struct {
			// ID is the ID argument value.
			ID string
		}
		// GetApps holds details about calls to the GetApps method.
		GetApps []struct {
		}
	}
}

// GetAppByID calls GetAppByIDFunc.
func (mock *ServiceMock) GetAppByID(ID string) (*models.App, error) {
	if mock.GetAppByIDFunc == nil {
		panic("ServiceMock.GetAppByIDFunc: method is nil but Service.GetAppByID was just called")
	}
	callInfo := struct {
		ID string
	}{
		ID: ID,
	}
	lockServiceMockGetAppByID.Lock()
	mock.calls.GetAppByID = append(mock.calls.GetAppByID, callInfo)
	lockServiceMockGetAppByID.Unlock()
	return mock.GetAppByIDFunc(ID)
}

// GetAppByIDCalls gets all the calls that were made to GetAppByID.
// Check the length with:
//     len(mockedService.GetAppByIDCalls())
func (mock *ServiceMock) GetAppByIDCalls() []struct {
	ID string
} {
	var calls []struct {
		ID string
	}
	lockServiceMockGetAppByID.RLock()
	calls = mock.calls.GetAppByID
	lockServiceMockGetAppByID.RUnlock()
	return calls
}

// GetApps calls GetAppsFunc.
func (mock *ServiceMock) GetApps() (*[]models.App, error) {
	if mock.GetAppsFunc == nil {
		panic("ServiceMock.GetAppsFunc: method is nil but Service.GetApps was just called")
	}
	callInfo := struct {
	}{}
	lockServiceMockGetApps.Lock()
	mock.calls.GetApps = append(mock.calls.GetApps, callInfo)
	lockServiceMockGetApps.Unlock()
	return mock.GetAppsFunc()
}

// GetAppsCalls gets all the calls that were made to GetApps.
// Check the length with:
//     len(mockedService.GetAppsCalls())
func (mock *ServiceMock) GetAppsCalls() []struct {
} {
	var calls []struct {
	}
	lockServiceMockGetApps.RLock()
	calls = mock.calls.GetApps
	lockServiceMockGetApps.RUnlock()
	return calls
}